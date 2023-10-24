using Microsoft.Extensions.Options;
using LandManager.Application.Common.Configuration;

namespace LandManager.Application.Common.Infrastructure;

public class CommandBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
	where TRequest : IRequest<TResponse>
{
	private readonly ILogger _logger;
	private readonly ApplicationSettings _appSettings;

	public CommandBehavior(ILogger logger, IOptionsMonitor<ApplicationSettings> appSettings)
	{
		_logger = logger.ForContext("SourceContext", GetType().Name);
		_appSettings = appSettings.CurrentValue;
	}

	public Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<TResponse> next)
	{
		// have the behavior only look at IRequest since it seems like constraining this class to ICommand is not possible
		// with built-in DI https://github.com/aspnet/DependencyInjection/issues/471
		if (!(request is ICommand<TResponse>))
		{
			_logger.Debug("Request is not an ICommand. calling next()");
			return next();
		}

		if (_appSettings.LockSite)
		{
			_logger.Information("Site is locked for editing. Throwing SiteLockedException for command {CommandName}", request.GetType().Name);
			throw new SiteLockedException();
		}

		_logger.Debug("Site is not locked for editing. Allowing command to proceed");
		return next();
	}
}