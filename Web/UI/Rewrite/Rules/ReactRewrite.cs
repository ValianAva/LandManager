using Microsoft.AspNetCore.Rewrite;

namespace LandManager.UI.Rewrite.Rules;

public class ReactRewrite : IRule
{
	private readonly IWebHostEnvironment _env;
	public ReactRewrite(IWebHostEnvironment env)
	{
		_env = env;
	}

	//
	public void ApplyRule(RewriteContext context)
	{
		//some code taken from https://docs.microsoft.com/en-us/aspnet/core/fundamentals/url-rewriting?tabs=aspnetcore2x
		string newPath = new PathString("/");
		var request = context.HttpContext.Request;

		// Because we're redirecting back to the same app, stop
		// processing if the request has already been redirected
		if (request.Path.StartsWithSegments(new PathString(newPath)))
		{
			return;
		}

		//if it's a file, is a directory, or HMR then just let it go
		if (RewriteHelpers.IsFile(_env.WebRootPath, request.Path) ||
		RewriteHelpers.IsDirectory(_env.WebRootPath, request.Path))
		{
			return;
		}

		request.Path = newPath;
	}
}