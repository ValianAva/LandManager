using LandManager.Domain.Enums;
using LandManager.Domain.Models;

namespace LandManager.Application.Common.Commands.Queries.GetCommands;

public class CommandDto : IHaveCustomMapping
{
	public int Id { get; set; }
	public string Name { get; set; }
	public Services? ServiceId { get; set; }

	public void CreateMappings(Profile configuration)
	{
		configuration.CreateMap<Command, CommandDto>();
	}
}