using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using LandManager.Application.Common.Configuration;

namespace LandManager.API.SSO.Controllers;


public class ConfigController : BaseController
{
	private readonly UiSettings _options;

	public ConfigController(IOptions<UiSettings> options)
	{
		_options = options.Value;
	}

	// GET config/settings.js
	[HttpGet("settings.js")]
	[AllowAnonymous]
	public IActionResult Get()
	{
		var serializerSettings = new JsonSerializerSettings
		{
			ContractResolver = new CamelCasePropertyNamesContractResolver()
		};
		return Content("var settings = " + JsonConvert.SerializeObject(_options, serializerSettings), "text/javascript");
	}
}