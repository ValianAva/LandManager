using LandManager.Application.Common.Commands.Queries.GetCommands;
using LandManager.Domain.Enums;

namespace LandManager.API.SSO.Controllers;


public class CommandsController : BaseController
{

	// GET Commands
	[HttpGet("{serviceId?}")]
	public async Task<IActionResult> Get(Services? serviceId)
	{
		return Ok(await Mediator.Send(new GetCommandsQuery() { ServiceId = serviceId }));
	}

}