using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.Extensions.Options;
using LandManager.Application.Common.Configuration;

namespace LandManager.API.Common.Attributes;

/// <summary>
/// An HTTP method attribute that allows us to toggle between a DELETE and POST method,
/// given security requirements of the hosting environment
/// If set to use POST, all actions will have delete/ prepended to the route template
/// </summary>
public class DeletePostToggleAttribute : Attribute, IActionHttpMethodProvider, IRouteTemplateProvider
{
	private int? _order;

	public DeletePostToggleAttribute() : this(null)
	{
	}

	public DeletePostToggleAttribute(string template)
	{
		ApplicationSettings applicationSettings = ServiceLocator.Current.GetInstance<IOptions<ApplicationSettings>>().Value;

		HttpMethods = new[] { applicationSettings.UsePost ? "POST" : "DELETE" };
		Template = (applicationSettings.UsePost ? "delete/" : "") + template;
	}

	public IEnumerable<string> HttpMethods { get; }

	public string Template { get; }

	public int Order
	{
		get { return _order ?? 0; }
		set { _order = value; }
	}

	int? IRouteTemplateProvider.Order => _order;

	public string Name { get; set; }
}