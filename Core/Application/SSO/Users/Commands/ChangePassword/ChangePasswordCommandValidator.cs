using FluentValidation;

namespace LandManager.Application.SSO.Users.Commands.ChangePassword;

public class ChangePasswordCommandValidator : AbstractValidator<ChangePasswordCommand>
{
	public ChangePasswordCommandValidator()
	{
		RuleFor(e => e.OldPassword)
			.NotEmpty().WithMessage("OldPassword is required");

		RuleFor(e => e.NewPassword)
			.NotEmpty().WithMessage("NewPassword is required");

		RuleFor(e => e.ConfirmPassword)
			.NotEmpty().WithMessage("ConfirmPassword is required")
			.Equal(e => e.NewPassword).WithMessage("New passwords must match");


	}
}