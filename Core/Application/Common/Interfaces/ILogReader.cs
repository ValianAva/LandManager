namespace LandManager.Application.Common.Interfaces;

public interface ILogReader
{
	List<string> GetLogFiles();
	string GetLogContents(string filename);
}