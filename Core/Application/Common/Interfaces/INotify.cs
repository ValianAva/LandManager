namespace LandManager.Application.Common.Interfaces;

// named iNotify to avoid name conflict with Mediatr INotification
public interface INotify
{
	void Send(string to, string subject, string body);
}
