using LandManager.Domain.Enums;

namespace LandManager.Domain.Models;

public class AccessLevel
{
	public AccessLevels Id { get; set; }
	public string Name { get; set; }

	public virtual ICollection<UserApplicationAccess> UserApplicationAccess { get; set; } = new HashSet<UserApplicationAccess>();
}
