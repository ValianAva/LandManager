namespace LandManager.Application.SSO.Common.Interfaces;

public interface IUserAuthorizer
{
	bool HasAccess(string id);
}