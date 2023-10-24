using LandManager.Domain.Models;

namespace LandManager.Application.SSO.Users.Common;

public sealed class ApplicationAccessDto : IHaveCustomMapping
{
	public string Application { get; set; }
	public string AccessLevel { get; set; }

	public void CreateMappings(Profile configuration)
	{
		configuration.CreateMap<UserApplicationAccess, ApplicationAccessDto>()
			.ForMember(d => d.Application, o => o.MapFrom(s => s.ConnectedApplication.Name))
			.ForMember(d => d.AccessLevel, o => o.MapFrom(s => s.AccessLevel.Name));
	}
}