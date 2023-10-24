using LandManager.Domain.Enums;
using LandManager.Domain.Models;

namespace LandManager.Application.SSO.Users.Common;

public sealed class ServiceDto : IHaveCustomMapping
{
	public Services Id { get; set; }
	public string Name { get; set; }

	public void CreateMappings(Profile configuration)
	{
		configuration.CreateMap<Service, ServiceDto>();
	}
}