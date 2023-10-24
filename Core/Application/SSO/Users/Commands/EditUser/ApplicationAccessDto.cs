using LandManager.Domain.Enums;
using LandManager.Domain.Models;

namespace LandManager.Application.SSO.Users.Commands.EditUser;

public class ApplicationAccessDto : IHaveCustomMapping
{
	public ConnectedApplications ApplicationId { get; set; }
	public AccessLevels AccessLevelId { get; set; }

	public void CreateMappings(Profile configuration)
	{
		configuration.CreateMap<ApplicationAccessDto, UserApplicationAccess>()
			.ForMember(d => d.ConnectedApplicationId, o => o.MapFrom(s => s.ApplicationId))
			.ForMember(d => d.AccessLevelId, o => o.MapFrom(s => s.AccessLevelId));
	}
}