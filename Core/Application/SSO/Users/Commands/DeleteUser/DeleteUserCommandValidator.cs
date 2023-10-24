using FluentValidation;

namespace LandManager.Application.SSO.Users.Commands.DeleteUser;

public class DeleteUserCommandValidator : AbstractValidator<DeleteUserCommand>
{
	public DeleteUserCommandValidator()
	{
		RuleFor(v => v.Id)
			.NotEmpty().WithMessage("Id is required");
	}
}