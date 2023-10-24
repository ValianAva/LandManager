using LandManager.Domain.Enums;

namespace LandManager.Domain.Models;

public class UserApplicationAccess
{
	public UserApplicationAccess()
	{
		UserId = new Guid().ToString();
	}

	public string UserId { get; set; }
	public ConnectedApplications ConnectedApplicationId { get; set; }
	public AccessLevels AccessLevelId { get; set; }

	public virtual ConnectedApplication ConnectedApplication { get; set; }
	public virtual AccessLevel AccessLevel { get; set; }
	public virtual User User { get; set; }
}