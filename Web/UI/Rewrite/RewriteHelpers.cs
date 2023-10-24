namespace LandManager.UI.Rewrite;

public static class RewriteHelpers
{
	/// <summary>
	/// Checks if a file exists on the file system
	/// </summary>
	/// <param name="webRoot">The physical path to this application's wwwroot</param>
	/// <param name="relPath">The path from the request</param>
	/// <returns></returns>
	public static bool IsFile(string webRoot, string relPath)
	{
		return File.Exists(Combine(webRoot, relPath));
	}

	/// <summary>
	/// Checks if a directory exists on the file system
	/// </summary>
	/// <param name="webRoot">The physical path to this application's wwwroot</param>
	/// <param name="relPath">The path from the request</param>
	/// <returns></returns>
	public static bool IsDirectory(string webRoot, string relPath)
	{
		return Directory.Exists(Combine(webRoot, relPath));
	}

	/// <summary>
	/// combines a physical and relative path. Separate from the above methods due to this madness: https://stackoverflow.com/q/53102
	/// </summary>
	/// <param name="webRoot"></param>
	/// <param name="relPath"></param>
	/// <returns></returns>
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
}