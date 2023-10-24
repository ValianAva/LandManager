using FluentValidation;

namespace LandManager.Application.SSO.Users.Commands.EditUser;

public class EditUserCommandValidator : AbstractValidator<EditUserCommand>
{
	public EditUserCommandValidator()
	{
		RuleFor(e => e.Id)
			.NotEmpty().WithMessage("Id is required");

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