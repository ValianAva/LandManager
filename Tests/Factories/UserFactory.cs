using System.Security.Claims;
using LandManager.Domain.Enums;

namespace LandManager.Tests.Factories;

public static class UserFactory
{
	public const string DefaultId = "327d61be-4585-4c4f-bb6d-27be366d1abe";
	public const string DefaultEmail = "test@test.com";
	public const string SecondaryEmail = "test2@test.com";

	public static ClaimsIdentity CreateAppUser(bool isReadOnly = false)
	{
		return CreateUser(Roles.LandManager, isReadOnly: isReadOnly);
	}

	public static ClaimsIdentity CreateHQUser(Services serviceId, bool isReadOnly = false)
	{
		var u = CreateUser(Roles.Hq, serviceId: serviceId, isReadOnly: isReadOnly);
		return u;
	}

	public static ClaimsIdentity CreateRegion2User(Services serviceId, bool isReadOnly = false, params int[] installationIds)
	{
		return CreateUser(Roles.Region2, serviceId: serviceId, isReadOnly: isReadOnly, installationIds: installationIds);
	}

	public static ClaimsIdentity CreateRegion2User(Services serviceId, params int[] installationIds)
	{
		return CreateUser(Roles.Region2, serviceId: serviceId, installationIds: installationIds);
	}

	public static ClaimsIdentity CreateRegion1User(Services serviceId, string id = DefaultId, bool isReadOnly = false, params int[] installationIds)
	{
		return CreateUser(Roles.Region1, id, serviceId: serviceId, isReadOnly: isReadOnly, installationIds: installationIds);
	}

	public static ClaimsIdentity CreateRegion1User(Services serviceId, params int[] installationIds)
	{
		return CreateUser(Roles.Region1, serviceId: serviceId, installationIds: installationIds);
	}

	public static ClaimsIdentity CreateInstallationUser(Services serviceId, string id = DefaultId, string username = DefaultEmail, bool isReadOnly = false, params int[] installationIds)
	{
		return CreateUser(Roles.Installation, id, username, serviceId, isReadOnly, installationIds);
	}

	public static ClaimsIdentity CreateInstallationUser(Services serviceId, params int[] installationIds)
	{
		return CreateUser(Roles.Installation, serviceId: serviceId, installationIds: installationIds);
	}

	public static ClaimsIdentity CreatePartnerUser(Services serviceId, string id = DefaultId, string username = DefaultEmail, bool isReadOnly = false, int[]? installationIds = null, int[]? partnerIds = null)
	{
		return CreateUser(Roles.Partner, id, username, serviceId, isReadOnly, installationIds, partnerIds);
	}

	public static ClaimsIdentity CreatePartnerUser(Services serviceId, int[] installationIds, int[] partnerIds)
	{
		return CreateUser(Roles.Partner, serviceId: serviceId, installationIds: installationIds, partnerIds: partnerIds);
	}

	public static ClaimsIdentity CreateUser(string role, string id = DefaultId, string username = DefaultEmail, Services serviceId = 0, bool isReadOnly = false, int[]? installationIds = null, int[]? partnerIds = null)
	{
		var user = new ClaimsIdentity("mock"); // setting this to a string is what changes Identity.IsAuthenticated to true
		user.AddClaims(new[]
		{
				new Claim(ClaimTypes.NameIdentifier, id),
				new Claim(ClaimTypes.NameIdentifier, id),
				new Claim(ClaimTypes.Role, role),
				new Claim(AppClaimTypes.ServiceId, ((int)serviceId).ToString()),
				new Claim("preferred_username", username),
			});

		installationIds ??= Array.Empty<int>();
		partnerIds ??= Array.Empty<int>();

		user.AddClaims(installationIds.Select(i => new Claim(AppClaimTypes.Installation, i.ToString())));
		user.AddClaims(partnerIds.Select(p => new Claim(AppClaimTypes.Partner, p.ToString())));

		if (isReadOnly)
		{
			user.AddClaim(new Claim(AppClaimTypes.ApplicationAccess, "Projects-ReadOnly"));
			user.AddClaim(new Claim(AppClaimTypes.ApplicationAccess, "ProposalTracker-ReadOnly"));
		}
		return user;
	}
}