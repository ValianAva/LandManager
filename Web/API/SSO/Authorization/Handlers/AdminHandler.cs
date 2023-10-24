using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using LandManager.API.SSO.Authorization.Requirements;
using LandManager.Application.Common.Helpers;

namespace LandManager.API.SSO.Authorization.Handlers;

public class AdminHandler : AuthorizationHandler<AdminRequirement>
{

	protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, AdminRequirement requirement)
	{
		if (ClaimsHelper.IsAdmin(context.User.Identity as ClaimsIdentity) || context.User.HasClaim("client_id", "app.proposaltracker.http.client"))
		{
			context.Succeed(requirement);
		}

		//complete regardless of a single condition passing above
		return Task.CompletedTask;
	}
}