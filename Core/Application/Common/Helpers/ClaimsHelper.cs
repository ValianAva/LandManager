using System.Security.Claims;
using LandManager.Domain.Enums;

namespace LandManager.Application.Common.Helpers;

public static class ClaimsHelper
{
	public static Guid Id(ClaimsIdentity user)
	{
		return new Guid(user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value);
	}

	public static string Username(ClaimsIdentity user)
	{
		return user.Claims.FirstOrDefault(c => c.Type == "preferred_username")?.Value;
	}

	public static string Role(ClaimsIdentity user)
	{
		return user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value ?? "";
	}

	public static bool IsInRole(ClaimsIdentity user, string roleName)
	{
		return user.HasClaim(claim => claim.Type == ClaimTypes.Role && string.Equals(claim.Value, roleName, StringComparison.InvariantCultureIgnoreCase));
	}

	public static bool IsAdmin(ClaimsIdentity user)
	{
		var c = user.FindFirst(AppClaimTypes.HasAdminAccess);
		return bool.Parse(c != null ? c.Value : "false");
	}

	/// <summary>
	/// 
	/// </summary>
	/// <param name="user"></param>
	/// <param name="application">'Projects' | 'ProposalTracker' | 'SSO'</param>
	/// <returns></returns>
	public static bool IsReadOnly(ClaimsIdentity user, string application)
	{
		return user.HasClaim(AppClaimTypes.ApplicationAccess, $"{application}-ReadOnly");
	}



	public static List<int> Installations(ClaimsIdentity user)
	{
		return user.FindAll(claim => claim.Type.Equals(AppClaimTypes.Installation)).Select(claim => int.Parse(claim.Value)).ToList();
	}

	public static List<int> Partners(ClaimsIdentity user)
	{
		return user.FindAll(claim => claim.Type.Equals(AppClaimTypes.Partner)).Select(claim => int.Parse(claim.Value)).ToList();
	}

	/// <summary>
	/// Returns the value of the serviceId claim, if the user has it. Returns 0 otherwise
	/// </summary>
	/// <param name="user"></param>
	/// <returns></returns>
	public static Services ServiceId(ClaimsIdentity user)
	{
		return (Services)(user.HasClaim(c => c.Type == AppClaimTypes.ServiceId) ? int.Parse(user.FindFirst(AppClaimTypes.ServiceId).Value) : 0);
	}

	// making a special method for advana since we know it should have access to read all data
	// not a certainty that other IDServer clients will have the same access
	public static bool IsAdvana(ClaimsIdentity user)
	{
		return user.HasClaim(c => c.Type == "client_id" && c.Value == "advana");
	}
}