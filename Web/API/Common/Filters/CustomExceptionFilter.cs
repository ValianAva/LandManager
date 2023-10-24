using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using LandManager.Application.Common.Exceptions;

namespace LandManager.API.Common.Filters;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class CustomExceptionFilterAttribute : ExceptionFilterAttribute
{
	private readonly ILogger _logger;

	public CustomExceptionFilterAttribute(ILogger logger)
	{
		_logger = logger.ForContext("SourceContext", GetType().Name);
	}

	public override void OnException(ExceptionContext context)
	{
		string url = context.HttpContext.Request.Path;
		string verb = context.HttpContext.Request.Method;
		context.HttpContext.Response.ContentType = "application/json";
		var code = HttpStatusCode.InternalServerError;
		var result = new JsonResult(new
		{
			error = new[] { context.Exception.Message }
		});

		if (context.Exception is ValidationException)
		{
			code = HttpStatusCode.BadRequest;
			result = new JsonResult(
				((ValidationException)context.Exception).Failures);
			_logger.Warning(context.Exception, "Returning validation exception for url {Url} using HTTP verb {Verb}", url, verb);
		}
		else if (context.Exception is NotFoundException)
		{
			_logger.Warning(context.Exception, "Returning not found exception for url {Url} using HTTP verb {Verb}", url, verb);
			code = HttpStatusCode.NotFound;
		}
		else if (context.Exception is NotAuthorizedException)
		{
			_logger.Warning(context.Exception, "Returning not authorized exception for url {Url} using HTTP verb {Verb}", url, verb);
			// return forbidden since API actions are protected by the authorized attribute
			// so we should know who the user is if they got far enough to throw this exception
			code = HttpStatusCode.Forbidden;
		}
		else if (context.Exception is SiteLockedException)
		{
			_logger.Warning(context.Exception, "Returning site locked exception for url {Url} using HTTP verb {Verb}", url, verb);
			code = HttpStatusCode.Locked;
		}
		else
		{
			_logger.Error(context.Exception, "Unhandled exception in API for url {Url} using HTTP verb {Verb}", url, verb);
			// only include stack trace for unhandled exceptions
			result = new JsonResult(new
			{
				error = new[] { context.Exception.Message },
				stackTrace = context.Exception.StackTrace
			});
		}

		context.HttpContext.Response.StatusCode = (int)code;
		context.Result = result;
	}
}
