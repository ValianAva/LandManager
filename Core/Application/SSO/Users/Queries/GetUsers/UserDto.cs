using LandManager.Application.SSO.Users.Common;
using LandManager.Domain.Enums;
using LandManager.Domain.Models;

namespace LandManager.Application.SSO.Users.Queries.GetUsers;

public class UserDto : IHaveCustomMapping
{
	public string Id { get; set; }
	public string Name { get; set; }
	public string UserName { get; set; }
	public string ServiceName { get; set; }
	public Services? ServiceId { get; set; }
	public string RoleName { get; set; }
	public bool HasAdminAccess { get; set; }
	public List<PartnerDto> Partners { get; set; }
	public List<InstallationDto> Installations { get; set; }
	public List<ApplicationAccessDto> ApplicationAccess { get; set; }
	public DateTime? LastLogin { get; set; }

	public void CreateMappings(Profile configuration)
	{
		configuration.CreateMap<User, UserDto>()
			.ForMember(d => d.RoleName, o => o.MapFrom(s => s.UserRoles.Select(r => r.Role).FirstOrDefault().Name));
	}
}