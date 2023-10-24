
namespace LandManager.Application.Common.Exceptions;

public class SiteLockedException : Exception
{
	public SiteLockedException(string message = "Site is currently locked for editing")
		: base(message)
	{
	}
}