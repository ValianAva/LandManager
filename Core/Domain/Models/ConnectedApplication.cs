using LandManager.Domain.Enums;

namespace LandManager.Domain.Models;

public class ConnectedApplication
{
	public ConnectedApplications Id { get; set; }
	public string Name { get; set; }

	public virtual ICollection<UserApplicationAccess> UserApplicationAccess { get; set; } = new HashSet<UserApplicationAccess>();
}
