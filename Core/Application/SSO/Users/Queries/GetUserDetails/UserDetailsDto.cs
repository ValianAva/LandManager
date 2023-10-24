using LandManager.Application.SSO.Users.Common;
using LandManager.Domain.Enums;
using LandManager.Domain.Models;

namespace LandManager.Application.SSO.Users.Queries.GetUserDetails;

public class UserDetailsDto : IHaveCustomMapping
{
	public string Id { get; set; }
	public string GivenName { get; set; }
	public string FamilyName { get; set; }
	public string UserName { get; set; }
	public Services ServiceId { get; set; }
	public string RoleName { get; set; }
	public bool HasAdminAccess { get; set; }
	public bool IsDisabled { get; set; }

	public List<PartnerDto> Partners { get; set; }
	public List<InstallationDto> Installations { get; set; }
	public List<ApplicationAccessDto> ApplicationAccess { get; set; }

	public void CreateMappings(Profile configuration)
	{
		configuration.CreateMap<User, UserDetailsDto>()
			.ForMember(d => d.RoleName, o => o.MapFrom(s => s.UserRoles.FirstOrDefault().Role.Name));
	}
}