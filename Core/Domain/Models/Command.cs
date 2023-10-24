using LandManager.Domain.Enums;

namespace LandManager.Domain.Models;

public class Command
{
	public int Id { get; set; }
	public string Name { get; set; }
	public Services? ServiceId { get; set; }

	public virtual ICollection<Installation> Installations { get; set; } = new HashSet<Installation>();
	public virtual Service Service { get; set; }
}
