using Microsoft.AspNetCore.Identity;
using LandManager.Domain.Enums;
using LandManager.Domain.Models;
using RolesEnum = LandManager.Domain.Enums.Roles;

namespace LandManager.Application.SSO.Users.Commands.AddUser;

public class AddUserCommand : ICommand<string>, IHaveCustomMapping
{
	public string GivenName { get; set; }
	public string FamilyName { get; set; }
	public string Email { get; set; }
	public string RoleName { get; set; }
	public Services? ServiceId { get; set; }
	public bool HasAdminAccess { get; set; }
	public List<int> InstallationIds { get; set; } = new List<int>();
	public List<int> PartnerIds { get; set; } = new List<int>();
	public List<ApplicationAccessDto> ApplicationAccess { get; set; }

	public void CreateMappings(Profile configuration)
	{
		configuration.CreateMap<AddUserCommand, User>()
			.ForMember(d => d.UserName, o => o.MapFrom(s => s.Email))
			.ForMember(d => d.Name, o => o.MapFrom(s => $"{s.GivenName} {s.FamilyName}"));
	}
}

public class AddUserCommandHandler : IRequestHandler<AddUserCommand, string>
{
	private readonly IAppContext _context;
	private readonly IMapper _mapper;
	private readonly UserManager<User> _userManager;
	private readonly IMediator _mediator;
	private readonly ILogger _logger;

	public AddUserCommandHandler(IAppContext context, IMediator mediator, IMapper mapper, ILogger logger, UserManager<User> userManager)
	{
		_context = context;
		_mediator = mediator;
		_mapper = mapper;
		_userManager = userManager;
		_logger = logger.ForContext("SourceContext", GetType().Name);
	}

	public async Task<string> Handle(AddUserCommand request, CancellationToken cancellationToken)
	{
		string[] specialCharacters = { "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "<", ">",
										"?", "+", "=", ".", "~" };
		Random rnd = new Random();
		int num = rnd.Next(1000);
		int specialchar = rnd.Next(specialCharacters.Length);
		string tempPw = specialCharacters[specialchar] + "Password" + num.ToString();

		//make sure data follows business logic for role and service before creating user
		var lowerRole = request.RoleName.ToLower();
		if (lowerRole == RolesEnum.LandManager.ToLower() || lowerRole == RolesEnum.NonInternal.ToLower() || lowerRole == RolesEnum.Reviewer.ToLower() || lowerRole == RolesEnum.Partner.ToLower())
			request.ServiceId = null;
		if (lowerRole == RolesEnum.Hq.ToLower() || lowerRole == RolesEnum.LandManager.ToLower())
			request.InstallationIds.Clear();
		if (lowerRole == RolesEnum.Installation.ToLower() || lowerRole == RolesEnum.Partner.ToLower())
			request.HasAdminAccess = false;

		// make sure only partner users have associated partner
		if (lowerRole != RolesEnum.Partner.ToLower())
		{
			request.PartnerIds.Clear();
		}

		// map to domain model
		User entity = _mapper.Map<User>(request);

		// set default and audit fields
		entity.NeedsPwChange = true;
		entity.ProposalFirstLogin = true;
		entity.ProjectsFirstLogin = true;
		entity.EmailConfirmed = true;
		entity.PhoneNumberConfirmed = true;
		entity.TwoFactorEnabled = false;

		// https://stackoverflow.com/a/59134407
		entity.Id = Guid.NewGuid().ToString();

		// create the user and add to role
		var createResult = await _userManager.CreateAsync(entity, tempPw);
		var roleResult = await _userManager.AddToRoleAsync(entity, request.RoleName);

		if (!createResult.Succeeded)
		{
			_logger.Warning("User not created. reason: {@ErrorMessages}", createResult.Errors.Select(e => e.Description));
			throw new Exception("User creation failed");
			// just throw Exception since this could be anything from invalid username chars, to duplicate username,
			// to failed db connection
		}
		if (!roleResult.Succeeded)
		{
			_logger.Warning("User not added to roles. reason: {@ErrorMessage}", roleResult.Errors.Select(e => e.Description));
			throw new Exception("Adding user to role failed");
		}
		_logger.Information("Added User {UserId} to database", entity.Id);

		// manually tie nav properties to the main entity since CreateAsync doesn't add nav properties
		// and leaving userId null or default value will cause EF to complain
		// nav props will be added when Update is called on the entity
		// not sure if this is necessary...but it works
		foreach (var a in entity.ApplicationAccess)
		{
			a.UserId = entity.Id;
		}

		foreach (var i in request.InstallationIds)
		{
			var installation = _context.Installation.Find(i);
			entity.Installations.Add(installation);
		}

		foreach (var i in request.PartnerIds)
		{
			var partner = _context.Partner.Find(i);
			entity.Partners.Add(partner);
		}

		// add the entity so we can then get the nav props and add the user installations
		await _context.SaveChangesAsync(cancellationToken);


		// get user with nav props the notification handler needs, and fire that
		entity = _context.Users
			.Include(u => u.UserRoles).ThenInclude(r => r.Role)
			.Include(u => u.Installations)
			.Include(u => u.Service)
			.Include(u => u.Partners)
			.FirstOrDefault(u => u.UserName == request.Email);

		// add the entity collection to the UserInstallation intersect table

		await _mediator.Publish(new UserAdded { User = entity, TempPw = tempPw }, cancellationToken);

		return entity.Id;
	}
}