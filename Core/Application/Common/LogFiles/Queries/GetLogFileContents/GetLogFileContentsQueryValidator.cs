using FluentValidation;

namespace LandManager.Application.Common.LogFiles.Queries.GetLogFileContents;

public class GetLogFileContentsQueryValidator : AbstractValidator<GetLogFileContentsQuery>
{
	public GetLogFileContentsQueryValidator()
	{
		RuleFor(e => e.Name)
			.NotEmpty().WithMessage("Name is required");
	}
}