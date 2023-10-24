using Microsoft.AspNetCore.Authorization;
using LandManager.Application.SSO.Roles.Queries.GetRoles;

namespace LandManager.API.SSO.Controllers;

[Authorize(Policy = "Admin")]
public class RolesController : BaseController
{

	// GET Roles
	[HttpGet]
	public async Task<IActionResult> Get()
	{
		return Ok(await Mediator.Send(new GetRolesQuery()));
	}

}