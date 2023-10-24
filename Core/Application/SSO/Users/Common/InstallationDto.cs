using LandManager.Domain.Models;

namespace LandManager.Application.SSO.Users.Common;

public sealed class InstallationDto : IHaveCustomMapping
{
	public int Id { get; set; }
	public string Name { get; set; }

	public List<ServiceDto> Services { get; set; }

	public void CreateMappings(Profile configuration)
	{
		configuration.CreateMap<Installation, InstallationDto>();
	}
}