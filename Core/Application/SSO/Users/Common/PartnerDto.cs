using LandManager.Domain.Enums;
using LandManager.Domain.Models;

namespace LandManager.Application.SSO.Users.Common;

public sealed class PartnerDto : IHaveCustomMapping
{
	public int Id { get; set; }
	public string Name { get; set; }
	public PartnerTypes? PartnerTypeId { get; set; }
	public string PartnerTypeName { get; set; }
	public string Acronym { get; set; }

	public void CreateMappings(Profile configuration)
	{
		configuration.CreateMap<Partner, PartnerDto>();
	}
}