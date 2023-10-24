using Microsoft.AspNetCore.Identity;
using LandManager.Domain.Enums;

namespace LandManager.Domain.Models;

public class User : IdentityUser<string>
{
	public string Name { get; set; }
	public string GivenName { get; set; }
	public string FamilyName { get; set; }
	public bool NeedsPwChange { get; set; }
	public Services? ServiceId { get; set; }
	public bool? ProjectsFirstLogin { get; set; }
	public bool? ProposalFirstLogin { get; set; }
	public bool HasAdminAccess { get; set; }
	public DateTime? LastLogin { get; set; }
	public bool IsDisabled { get; set; }

	public virtual Service Service { get; set; }
	public virtual ICollection<Partner> Partners { get; set; } = new HashSet<Partner>();
	public virtual ICollection<Installation> Installations { get; set; } = new HashSet<Installation>();
	public virtual ICollection<UserApplicationAccess> ApplicationAccess { get; set; } = new List<UserApplicationAccess>();
	public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
}
