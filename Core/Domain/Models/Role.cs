using Microsoft.AspNetCore.Identity;

namespace LandManager.Domain.Models;

public class Role : IdentityRole<string>
{
	public virtual ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
}
