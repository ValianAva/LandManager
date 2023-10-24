using Microsoft.Extensions.Options;
using LandManager.Application.Common.Configuration;
using LandManager.Domain.Models;

namespace LandManager.Application.SSO.Users.Commands.AddUser;

public class UserAdded : INotification
{
	// what the notification handler needs to get its job done
	public User User { get; set; }
	public string TempPw { get; set; }

	public class UserAddedHandler : INotificationHandler<UserAdded>
	{
		private readonly INotify _notify;
		private readonly ApplicationSettings _applicationSettings;

		public UserAddedHandler(INotify notify, IOptions<ApplicationSettings> applicationSettings)
		{
			_notify = notify;
			_applicationSettings = applicationSettings.Value;
		}

		public async Task Handle(UserAdded notification, CancellationToken cancellationToken)
		{
			string body = "<h1>Account Created</h1><p>An account has been created for you for the LandManager data management applications. Details are below:</p>";
			body += $"<p>URL: {_applicationSettings.BaseUrl}<br />Username: {notification.User.Email}<br />Password: {notification.TempPw}</p>";

			_notify.Send(notification.User.Email, "Account Created", body);

			await Task.CompletedTask;
		}
	}
}