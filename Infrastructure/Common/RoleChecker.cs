using System.Security.Claims;
using LandManager.Application.Common.Helpers;
using LandManager.Application.Common.Interfaces;
using LandManager.Domain.Enums;

namespace LandManager.Infrastructure.Common;

public class RoleChecker : IRoleChecker
{
	private readonly ClaimsIdentity _user;
	private readonly ILogger _logger;
	private readonly string _application;
	private readonly string _email;

	/// <summary>
	/// 
	/// </summary>
	/// <param name="user"></param>
	/// <param name="logger"></param>
	/// <param name="application">'Projects' | 'ProposalTracker' | 'SSO'</param>
	public RoleChecker(ClaimsIdentity user, ILogger logger, string application)
	{
		_user = user;
		_email = ClaimsHelper.Username(user);
		_logger = logger.ForContext("SourceContext", GetType().Name);
		_application = application;
	}

	/// <summary>
	/// Checks if the user is in the LandManager role and runs the supplied action if true
	/// </summary>
	/// <param name="actionIfTrue"></param>
	/// <returns></returns>
	public IRoleChecker IsAdmin(Action actionIfTrue)
	{
		if (ClaimsHelper.Role(_user) == Roles.LandManager)
		{
			_logger.Debug("User {Username} is in the LandManager role. Calling action passed into method", _email);
			actionIfTrue();
		}

		if (ClaimsHelper.IsAdvana(_user))
		{
			_logger.Debug("User is Advana client. Calling action passed into method for IsAdmin");
			actionIfTrue();
		}

		return this;
	}

	// <summary>
	/// Checks if the user is in the LandManager role
	/// </summary>
	/// <returns></returns>
	public bool IsAdmin()
	{
		if (ClaimsHelper.Role(_user) == Roles.LandManager)
		{
			_logger.Debug("User {Username} is in LandManager role. Returning true", _email);
			return true;
		}

		if (ClaimsHelper.IsAdvana(_user))
		{
			_logger.Debug("User is Advana client. Returning true for IsAdmin");
			return true;
		}

		return false;
	}

	// <summary>
	/// Checks if the user is in the HQ role
	/// </summary>
	/// <returns></returns>
	public bool IsHQ()
	{
		if (ClaimsHelper.Role(_user) == Roles.Hq)
		{
			_logger.Debug("User {Username} is in HQ role. Returning true", _email);
			return true;
		}
		return false;
	}

	/// <summary>
	/// Checks if the user is in either the Region1 or Region2 role and runs the supplied action if true
	/// </summary>
	/// <param name="actionIfTrue">Action with installation ids as the parameter</param>
	/// <returns></returns>
	public IRoleChecker IsRegion(Action<List<int>> actionIfTrue)
	{
		if (ClaimsHelper.Role(_user) == Roles.Region1 || ClaimsHelper.Role(_user) == Roles.Region2)
		{
			List<int> installationIds = ClaimsHelper.Installations(_user);
			_logger.Debug("User {Username} is in one of the Region roles. Calling action passed into method with installationIds {@InstallationIds}", _email, installationIds);
			actionIfTrue(installationIds);
		}
		return this;
	}

	/// <summary>
	/// Checks if the user is in the Region1 role and runs the supplied action if true
	/// </summary>
	/// <param name="actionIfTrue">Action with installation ids as the parameter</param>
	/// <returns></returns>
	public IRoleChecker IsRegion1(Action<List<int>> actionIfTrue)
	{
		if (ClaimsHelper.Role(_user) == Roles.Region1)
		{
			List<int> installationIds = ClaimsHelper.Installations(_user);
			_logger.Debug("User {Username} is in Region1 role. Calling action passed into method with installationIds {@InstallationIds}", _email, installationIds);
			actionIfTrue(installationIds);
		}
		return this;
	}

	/// <summary>
	/// Checks if the user is in the Region2 role and runs the supplied action if true
	/// </summary>
	/// <param name="actionIfTrue">Action with installation ids as the parameter</param>
	/// <returns></returns>
	public IRoleChecker IsRegion2(Action<List<int>> actionIfTrue)
	{
		if (ClaimsHelper.Role(_user) == Roles.Region2)
		{
			List<int> installationIds = ClaimsHelper.Installations(_user);
			_logger.Debug("User {Username} is in Region2 role. Calling action passed into method with installationIds {@InstallationIds}", _email, installationIds);
			actionIfTrue(installationIds);
		}
		return this;
	}

	/// <summary>
	/// Checks if the user is in the Installation role and runs the supplied action if true
	/// </summary>
	/// <param name="actionIfTrue">Action with installation ids as the parameter</param>
	/// <returns></returns>
	public IRoleChecker IsInstallation(Action<List<int>> actionIfTrue)
	{
		if (ClaimsHelper.Role(_user) == Roles.Installation)
		{
			List<int> installationIds = ClaimsHelper.Installations(_user);
			_logger.Debug("User {Username} is in the Installation role. Calling action passed into method with installationIds {@InstallationIds}", _email, installationIds);
			actionIfTrue(installationIds);
		}
		return this;
	}

	// <summary>
	/// Checks if the user is in the installation role
	/// </summary>
	/// <returns></returns>
	public bool IsInstallation()
	{
		if (ClaimsHelper.Role(_user) == Roles.Installation)
		{
			_logger.Debug("User {Username} is in Installation role. Returning true", _email);
			return true;
		}
		return false;
	}

	// <summary>
	/// Checks if the user is in the Partner role and runs the supplied action if true
	/// </summary>
	/// <param name="actionIfTrue">Action with installation ids as the parameter</param>
	/// <returns></returns>
	public IRoleChecker IsPartner(Action<List<int>, List<int>> actionIfTrue)
	{
		if (ClaimsHelper.Role(_user) == Roles.Partner)
		{
			List<int> installationIds = ClaimsHelper.Installations(_user);
			List<int> partnerIds = ClaimsHelper.Partners(_user);

			_logger.Debug("User {Username} is in the Partner role. Calling action passed into method with installationIds {@InstallationIds} and partnerIds {@PartnerIds}", _email, installationIds, partnerIds);
			actionIfTrue(installationIds, partnerIds);
		}
		return this;
	}

	// <summary>
	/// Checks if the user is in the Partner role
	/// </summary>
	/// <returns></returns>
	public bool IsPartner()
	{
		if (ClaimsHelper.Role(_user) == Roles.Partner)
		{
			_logger.Debug("User {Username} is in Partner role. Returning true", _email);
			return true;
		}
		return false;
	}


	/// <summary>
	/// Checks if the user has read-only permissions
	/// </summary>
	/// <param name="actionIfTrue"></param>
	/// <returns></returns>
	public IRoleChecker IsReadOnly(Action actionIfTrue)
	{
		if (ClaimsHelper.IsReadOnly(_user, _application))
		{
			_logger.Debug("User {Username} is read-only. Calling action passed into method", _email);
			actionIfTrue();
		}

		if (ClaimsHelper.IsAdvana(_user))
		{
			_logger.Debug("User is Advana client. Making it read-only");
			actionIfTrue();
		}

		return this;
	}

	// <summary>
	/// Checks if the user has read-only permissions
	/// </summary>
	/// <returns></returns>
	public bool IsReadOnly()
	{
		if (ClaimsHelper.IsReadOnly(_user, _application))
		{
			_logger.Debug("User {Username} is read-only. Returning true", _email);
			return true;
		}

		if (ClaimsHelper.IsAdvana(_user))
		{
			_logger.Debug("User is Advana client. Returning read-only true");
			return true;
		}

		return false;
	}

	/// <summary>
	/// The user's full name for this instance of role checker
	/// </summary>
	/// <value></value>
	public string FullName()
	{
		return _user.Name;
	}

	/// <summary>
	/// The user's email for this instance of role checker
	/// </summary>
	/// <value></value>
	public string Email()
	{
		return _email;
	}

	/// <summary>
	/// The user's id for this instance of role checker
	/// </summary>
	/// <value></value>
	public Guid Id()
	{
		return ClaimsHelper.Id(_user);
	}

	/// <summary>
	/// The user's service id for this instance of role checker
	/// </summary>
	/// <value></value>
	public Services ServiceId()
	{
		return ClaimsHelper.ServiceId(_user);
	}
}