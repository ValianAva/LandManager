
using LandManager.Domain.Enums;
using LandManager.Domain.Models;

namespace LandManager.Application.Common.Extensions;

public static class IQueryableExtensions
{
	public static IQueryable<User> FilterByApp(this IQueryable<User> users, ConnectedApplications application)
	{
		return users.Where(u => !u.IsDisabled && u.ApplicationAccess.Any(a => a.AccessLevelId != AccessLevels.None && a.ConnectedApplicationId == application));
	}

	public static IQueryable<User> FilterByRole(this IQueryable<User> users, string role, List<Services> serviceIds = null, List<int> installationIds = null)
	{
		users = users.Where(u => !u.IsDisabled && u.UserRoles.Select(r => r.Role.Name).Contains(role));

		if (installationIds != null)
		{
			return users.Where(u => u.Installations.Select(i => i.Id).Any(i => installationIds.Contains(i)));
		}

		if (serviceIds != null)
		{
			return users.Where(u => u.ServiceId.HasValue && serviceIds.Contains(u.ServiceId.Value));
		}

		return users;
	}
}