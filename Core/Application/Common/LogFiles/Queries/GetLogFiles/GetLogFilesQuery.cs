namespace LandManager.Application.Common.LogFiles.Queries.GetLogFiles;

public class GetLogFilesQuery : IQuery<IList<string>>
{
}

public class GetLogFilesQueryHandler : IRequestHandler<GetLogFilesQuery, IList<string>>
{
	private readonly ILogReader _logReader;
	private readonly ILogger _logger;

	public GetLogFilesQueryHandler(ILogReader logReader, ILogger logger)
	{
		_logReader = logReader;
		_logger = logger;
	}

	public async Task<IList<string>> Handle(GetLogFilesQuery request, CancellationToken cancellationToken)
	{
		var files = _logReader.GetLogFiles();

		_logger.Debug("Returning {FileCount} Log files", files.Count);
		return await Task.FromResult(files);
	}
}