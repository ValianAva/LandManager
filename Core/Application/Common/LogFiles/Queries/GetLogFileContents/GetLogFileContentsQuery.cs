namespace LandManager.Application.Common.LogFiles.Queries.GetLogFileContents;

public class GetLogFileContentsQuery : IQuery<string>
{
	public string Name { get; set; }
}

public class GetLogFileContentsQueryHandler : IRequestHandler<GetLogFileContentsQuery, string>
{
	private readonly ILogReader _logReader;

	public GetLogFileContentsQueryHandler(ILogReader logReader)
	{
		_logReader = logReader;
	}

	public async Task<string> Handle(GetLogFileContentsQuery request, CancellationToken cancellationToken)
	{
		var contents = _logReader.GetLogContents(request.Name);

		return await Task.FromResult(contents);
	}
}