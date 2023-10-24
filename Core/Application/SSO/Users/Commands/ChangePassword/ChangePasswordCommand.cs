using FluentValidation.Results;
using Microsoft.AspNetCore.Identity;
using LandManager.Domain.Models;

namespace LandManager.Application.SSO.Users.Commands.ChangePassword;

public class ChangePasswordCommand : ICommand<bool>, IHaveCustomMapping
{
	public string OldPassword { get; set; }
	public string NewPassword { get; set; }
	public string ConfirmPassword { get; set; }

	public void CreateMappings(Profile configuration)
	{
		configuration.CreateMap<ChangePasswordCommand, User>();
	}
}

public class ChangePasswordCommandHandler : IRequestHandler<ChangePasswordCommand, bool>
{
	private readonly IMapper _mapper;
	private readonly UserManager<User> _userManager;
	private readonly ILogger _logger;
	private readonly IRoleChecker _roleChecker;

	public ChangePasswordCommandHandler(IMapper mapper, ILogger logger, UserManager<User> userManager, IRoleChecker roleChecker)
	{
		_mapper = mapper;
		_userManager = userManager;
		_logger = logger.ForContext("SourceContext", GetType().Name);
		_roleChecker = roleChecker;
	}

	public async Task<bool> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
	{
		var id = _roleChecker.Id().ToString();

		// find in database
		User entity = await _userManager.FindByIdAsync(id);

		if (entity == null)
		{
			_logger.Warning("User {UserId} not found in database. Throwing NotFoundException.", id);
			throw new NotFoundException(nameof(User), id);
		}

		// save to database
		var response = await _userManager.ChangePasswordAsync(entity, request.OldPassword, request.NewPassword);
		if (response.Succeeded)
		{
			_logger.Information("Password for user {UserId} updated in database.", entity.Id);
			return true;
		}
		else
		{
			_logger.Warning("Failed to update password for user {UserId}. {@ErrorMessages}", entity.Id, response.Errors.Select(e => e.Description));
			var errors = new List<ValidationFailure>(response.Errors.Select(e => new ValidationFailure("password", e.Description)));

			throw new ValidationException(errors);
		}
	}
}