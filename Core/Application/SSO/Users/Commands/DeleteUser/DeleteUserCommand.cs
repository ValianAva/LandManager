using Microsoft.AspNetCore.Identity;
using LandManager.Domain.Models;

namespace LandManager.Application.SSO.Users.Commands.DeleteUser;

public class DeleteUserCommand : ICommand<string>
{
	public string Id { get; set; }
}

public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, string>
{
	private readonly IAppContext _context;
	private readonly IMapper _mapper;
	private readonly IUserAuthorizer _userAuthorizer;
	private readonly UserManager<User> _userManager;
	private readonly ILogger _logger;

	public DeleteUserCommandHandler(IAppContext context, IMapper mapper, ILogger logger, IUserAuthorizer userAuthorizer, UserManager<User> userManager)
	{
		_context = context;
		_mapper = mapper;
		_userAuthorizer = userAuthorizer;
		_userManager = userManager;
		_logger = logger.ForContext("SourceContext", GetType().Name);
	}

	public async Task<string> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
	{
		// find in database
		User entity = await _context.Users
			.Include(u => u.Installations)
			.Include(u => u.Partners)
			.Include(u => u.ApplicationAccess)
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

		// delete from database	
		await _userManager.DeleteAsync(entity);

		_logger.Information("User {UserId} removed from database.", entity.Id);

		return request.Id;
	}
}