
namespace LandManager.Application.Common.Exceptions;

public class NotAuthorizedException : Exception
{
	public NotAuthorizedException()
		: base($"You are not authorized to view this entity")
	{
	}

	public NotAuthorizedException(string message) : base(message)
	{

	}
}