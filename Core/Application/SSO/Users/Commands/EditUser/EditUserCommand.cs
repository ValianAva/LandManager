using Microsoft.AspNetCore.Identity;
using LandManager.Domain.Enums;
using LandManager.Domain.Models;
using RolesEnum = LandManager.Domain.Enums.Roles;

namespace LandManager.Application.SSO.Users.Commands.EditUser;

public class EditUserCommand : ICommand<string>, IHaveCustomMapping
{
	public string Id { get; set; }
	public string GivenName { get; set; }
	public string FamilyName { get; set; }
	public string Email { get; set; }
	public string RoleName { get; set; }
	public Services? ServiceId { get; set; }
	public bool HasAdminAccess { get; set; }
	public List<int> InstallationIds { get; set; } = new List<int>();
	public List<int> PartnerIds { get; set; } = new List<int>();
	public List<ApplicationAccessDto> ApplicationAccess { get; set; }
	public bool IsDisabled { get; set; }

	public void CreateMappings(Profile configuration)
	{
		configuration.CreateMap<EditUserCommand, User>()
			.ForMember(d => d.UserName, o => o.MapFrom(s => s.Email))
			.ForMember(d => d.ApplicationAccess, o => o.MapFrom(s => s.ApplicationAccess))
			.ForMember(d => d.Name, o => o.MapFrom(s => $"{s.GivenName} {s.FamilyName}"));
	}
}

public class EditUserCommandHandler : IRequestHandler<EditUserCommand, string>
{
	private readonly IMapper _mapper;
	private readonly IUserAuthorizer _userAuthorizer;
	private readonly UserManager<User> _userManager;
	private readonly IAppContext _context;
	private readonly ILogger _logger;

	public EditUserCommandHandler(IMapper mapper, ILogger logger, IUserAuthorizer userAuthorizer, UserManager<User> userManager, IAppContext context)
	{
		_mapper = mapper;
		_userAuthorizer = userAuthorizer;
		_userManager = userManager;
		_context = context;
		_logger = logger.ForContext("SourceContext", GetType().Name);
	}

	public async Task<string> Handle(EditUserCommand request, CancellationToken cancellationToken)
	{
		// Note: don't mix _userManager and _context. It'll cause issues with an entity
		// with the same id is already being tracked. That't because UserManager
		// is using AppContext under the hood

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

		// find in database
		User entity = await _userManager.Users
			.Include(u => u.Installations)
			.Include(u => u.ApplicationAccess)
			.Include(u => u.Partners)
			.FirstOrDefaultAsync(u => u.Id == request.Id, cancellationToken);


		if (entity == null)
		{
			_logger.Warning("User {UserId} not found in database. Throwing NotFoundException.", request.Id);
			throw new NotFoundException(nameof(User), request.Id);
		}

		if (!_userAuthorizer.HasAccess(request.Id))
		{
			_logger.Warning("User is not allowed to edit user {UserId}. Throwing NotAuthorizedException.", request.Id);
			throw new NotAuthorizedException();
		}

		// reset roles			
		var currentRoles = await _userManager.GetRolesAsync(entity);
		await _userManager.RemoveFromRolesAsync(entity, currentRoles);
		await _userManager.AddToRoleAsync(entity, request.RoleName);

		// map to domain model
		_mapper.Map(request, entity);

		foreach (var a in entity.ApplicationAccess)
		{
			a.UserId = entity.Id;
		}

		// from this Stackoverflow answer https://stackoverflow.com/a/49289921
		entity.Installations = new List<Installation>();
		// add the new entity collection to the UserInstallation intersect table
		foreach (var i in request.InstallationIds)
		{
			var installation = _context.Installation.Find(i);
			entity.Installations.Add(installation);
		}

		entity.Partners = new List<Partner>();
		foreach (var i in request.PartnerIds)
		{
			var partner = _context.Partner.Find(i);
			entity.Partners.Add(partner);
		}

		// save to database
		await _userManager.UpdateAsync(entity);
		_logger.Information("User {UserId} updated in database.", entity.Id);

		return entity.Id;
	}
}