using Microsoft.AspNetCore.Authorization;
using LandManager.Application.SSO.Users.Commands.AddUser;
using LandManager.Application.SSO.Users.Commands.ChangePassword;
using LandManager.Application.SSO.Users.Commands.DeleteUser;
using LandManager.Application.SSO.Users.Commands.EditUser;
using LandManager.Application.SSO.Users.Queries.GetUserDetails;
using LandManager.Application.SSO.Users.Queries.GetUsers;

namespace LandManager.API.SSO.Controllers;

[Authorize]
public class UsersController : BaseController
{

	// GET Users
	[HttpGet]
	[Authorize(Policy = "Admin")]
	public async Task<IActionResult> Get()
	{
		return Ok(await Mediator.Send(new GetUsersQuery()));
	}

	// GET Users/08c953eb-2800-4fa2-830e-e6392ba1f4e6
	[HttpGet("{id}")]
	[Authorize(Policy = "Admin")]
	public async Task<IActionResult> Get(string id)
	{
		return Ok(await Mediator.Send(new GetUserDetailsQuery() { Id = id }));
	}

	// POST Users
	[HttpPost]
	[Authorize(Policy = "Admin")]
	public async Task<IActionResult> Post([FromBody] AddUserCommand command)
	{
		string newId = await Mediator.Send(command);
		return CreatedAtAction("Get", new { id = newId }, await Mediator.Send(new GetUserDetailsQuery() { Id = newId }));
	}

	// PUT Users
	[PutPostToggle("{id}")]
	[Authorize(Policy = "Admin")]
	public async Task<IActionResult> Put(string Id, [FromBody] EditUserCommand command)
	{
		string id = await Mediator.Send(command);
		return Ok(await Mediator.Send(new GetUserDetailsQuery() { Id = id }));
	}

	// DELETE Users
	[DeletePostToggle("{id}")]
	[Authorize(Policy = "Admin")]
	public async Task<IActionResult> Delete(string id)
	{
		return Ok(await Mediator.Send(new DeleteUserCommand() { Id = id }));
	}

	// PUT users/password
	[PutPostToggle("password")]
	public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordCommand command)
	{
		return Ok(await Mediator.Send(command));
	}

}