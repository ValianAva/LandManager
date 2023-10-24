
using Microsoft.EntityFrameworkCore;
using LandManager.Application.Common.Interfaces;
using LandManager.Application.SSO.Common.Interfaces;
using LandManager.Domain.Enums;
using LandManager.Domain.Models;

namespace LandManager.Infrastructure.SSO;

public class UserAuthorizer : IUserAuthorizer
{
	private readonly IRoleChecker _roleChecker;
	private readonly ILogger _logger;
	private readonly IAppContext _context;
	// inject a context instead of taking a user entity so we don't duplicate .Includes all over commands and queries
	public UserAuthorizer(IAppContext context, IRoleChecker roleChecker, ILogger logger)
	{
		_context = context;
		_roleChecker = roleChecker;
		_logger = logger.ForContext("SourceContext", GetType().Name);
	}

	public bool HasAccess(string id)
	{
		bool canView = false;
		User user = GetUser(id);

		_roleChecker
			.IsAdmin(() => canView = true)
			.IsRegion(installationIds => canView = user.Installations.Any(i => installationIds.Contains(i.Id)))
			.IsInstallation(installationIds => canView = false)
			.IsPartner((installationIds, partnerIds) => canView = false);

		_logger.Information("User {Username} {Permission} user {UserId}. User's installations are {@InstallationIds} and services are {@ServiceIds}", _roleChecker.Email(), canView ? "can view" : "cannot view", id, user.Installations.Select(i => i.Id), user.Installations.SelectMany(i => i.Services).Select(s => s.Id));
		return canView;
	}

	private User GetUser(string id)
	{
		return _context.Users
			.Include(p => p.UserRoles)
				.ThenInclude(r => r.Role)
			.Include(u => u.Installations)
				.ThenInclude(i => i.Services)
			.FirstOrDefault(p => p.Id == id);
	}
}