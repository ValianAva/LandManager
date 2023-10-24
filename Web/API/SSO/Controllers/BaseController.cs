using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Authorization;

namespace LandManager.API.SSO.Controllers;

[Route("[controller]")]
[ApiController]
[Authorize]
public abstract class BaseController : ControllerBase
{
	private IMediator _mediator;

	protected ClaimsIdentity CurrentUser { get { return HttpContext.User.Identity as ClaimsIdentity; } }
	protected IMediator Mediator => _mediator ?? (_mediator = HttpContext.RequestServices.GetService<IMediator>());
}