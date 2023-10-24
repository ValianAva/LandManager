using LandManager.Application.Common.Interfaces;

namespace LandManager.Infrastructure.Common;

public class LogReader : ILogReader
{
	private readonly ILogger _logger;
	private readonly string _baseDir;

	public LogReader(ILogger logger, string baseDir)
	{
		_logger = logger.ForContext("SourceContext", GetType().Name);
		_baseDir = baseDir;
	}

	public string GetLogContents(string filename)
	{
		var path = Combine(_baseDir, filename);
		if (!File.Exists(path))
		{
			return "";
		}

		// do all this instead of just ReadAllText since serilog may be locking the current log file
		var result = "";
		using (FileStream fileStream = new(
					path,
					FileMode.Open,
					FileAccess.Read,
					FileShare.ReadWrite))
		{
			using (StreamReader streamReader = new(fileStream))
			{
				result = streamReader.ReadToEnd();
			}
		}

		return result;
	}

	private static string Combine(string webRoot, string relPath)
	{
		//https://stackoverflow.com/a/31131504
		if (Path.IsPathRooted(relPath))
		{
			relPath = relPath.TrimStart(Path.DirectorySeparatorChar);
			relPath = relPath.TrimStart(Path.AltDirectorySeparatorChar);
		}

		return Path.Combine(webRoot, relPath);
	}

	public List<string> GetLogFiles()
	{
		var files = Directory.GetFiles(_baseDir);
		var returnFiles = new List<string>();

		foreach (var f in files)
		{
			returnFiles.Add(Path.GetFileName(f));
		}

		_logger.Information("Returning {FileCount} log files from {FilePath}", returnFiles.Count, _baseDir);

		return returnFiles;
	}
}