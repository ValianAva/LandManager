using LandManager.Domain.Models;

namespace LandManager.Application.SSO.Roles.Queries.GetRoles;

public class RoleDto : IHaveCustomMapping
{
	public string Id { get; set; }
	public string Name { get; set; }

	public void CreateMappings(Profile configuration)
	{
		configuration.CreateMap<Role, RoleDto>();
	}
}