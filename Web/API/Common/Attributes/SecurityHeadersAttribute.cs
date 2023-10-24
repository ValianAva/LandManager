// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace LandManager.API.Common.Attributes;

public class SecurityHeadersAttribute : ActionFilterAttribute
{
	public override void OnResultExecuting(ResultExecutingContext context)
	{
		var result = context.Result;
		if (result is ViewResult)
		{
			// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
			if (!context.HttpContext.Response.Headers.ContainsKey("X-Content-Type-Options"))
			{
				context.HttpContext.Response.Headers.Add("X-Content-Type-Options", "nosniff");
			}

			if (!context.HttpContext.Response.Headers.ContainsKey("X-Frame-Options"))
			{
				context.HttpContext.Response.Headers.Add("X-Frame-Options", "SAMEORIGIN");
			}

			// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
			var csp = "default-src 'self'; object-src 'none'; frame-ancestors 'self' *gmail.com; sandbox allow-forms allow-same-origin allow-scripts; base-uri 'self';";
			// also consider adding upgrade-insecure-requests once you have HTTPS in place for production
			//csp += "upgrade-insecure-requests;";
			// also an example if you need client images to be displayed from twitter
			csp += "img-src 'self' data:;";
			csp += "script-src 'self' 'unsafe-inline';";
			csp += "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://maxcdn.bootstrapcdn.com https://unpkg.com;";
			csp += "font-src 'self' https://fonts.gstatic.com https://maxcdn.bootstrapcdn.com https://unpkg.com;";

			// once for standards compliant browsers
			if (!context.HttpContext.Response.Headers.ContainsKey("Content-Security-Policy"))
			{
				context.HttpContext.Response.Headers.Add("Content-Security-Policy", csp);
			}
			// and once again for IE
			if (!context.HttpContext.Response.Headers.ContainsKey("X-Content-Security-Policy"))
			{
				context.HttpContext.Response.Headers.Add("X-Content-Security-Policy", csp);
			}

		}
	}
}
