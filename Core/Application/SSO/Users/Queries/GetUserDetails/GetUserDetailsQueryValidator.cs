using FluentValidation;

namespace LandManager.Application.SSO.Users.Queries.GetUserDetails;

public class GetUserDetailsQueryValidator : AbstractValidator<GetUserDetailsQuery>
{
	public GetUserDetailsQueryValidator()
	{
		RuleFor(v => v.Id)
			.NotEmpty().WithMessage("Id is required");

	}
}