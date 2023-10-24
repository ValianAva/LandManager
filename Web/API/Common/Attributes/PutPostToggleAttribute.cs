using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.Extensions.Options;
using LandManager.Application.Common.Configuration;

namespace LandManager.API.Common.Attributes;

// this was taken from .NET MVC source code for HttpPutAttribute.
// the resulting class is a mixture of the verb-specific classes and the base HttpMethodAttribute class.
// it was done this way since inheriting a new class from HttpMethodAttribute was not possible, 
// due to the need to compute values (based on config) before passing to the base constructor 

/// <summary>
/// An HTTP method attribute that allows us to toggle between a PUT and POST method,
/// given security requirements of the hosting environment
/// If set to use POST, all actions will have edit/ prepended to the route template
/// </summary>
public class PutPostToggleAttribute : Attribute, IActionHttpMethodProvider, IRouteTemplateProvider
{
	private int? _order;

	public PutPostToggleAttribute() : this(null)
	{
	}

	public PutPostToggleAttribute(string template)
	{
		ApplicationSettings applicationSettings = ServiceLocator.Current.GetInstance<IOptions<ApplicationSettings>>().Value;

		HttpMethods = new[] { applicationSettings.UsePost ? "POST" : "PUT" };
		Template = (applicationSettings.UsePost ? "edit/" : "") + template;
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