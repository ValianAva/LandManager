using FluentValidation;

namespace LandManager.Application.SSO.Users.Commands.AddUser;

public class AddUserCommandValidator : AbstractValidator<AddUserCommand>
{
	public AddUserCommandValidator()
	{
		RuleFor(e => e.GivenName)
			.NotEmpty().WithMessage("GivenName is required");

		RuleFor(e => e.FamilyName)
			.NotEmpty().WithMessage("FamilyName is required");

		RuleFor(e => e.Email)
			.NotEmpty().WithMessage("Email is required")
			.EmailAddress();

		RuleFor(e => e.HasAdminAccess)
			.NotNull().WithMessage("HasAdminAccess is required");

		RuleFor(e => e.ApplicationAccess)
			.NotNull().WithMessage("ApplicationAccess is required")
			.Must(e => e != null && e.Count > 0).WithMessage("ApplicationAccess must have at least one item");

	}
}