
using Microsoft.AspNetCore.Identity;

namespace LandManager.Persistence.Configuration;

public class IdentityUserLoginConfiguration : IEntityTypeConfiguration<IdentityUserLogin<string>>
{
	public void Configure(EntityTypeBuilder<IdentityUserLogin<string>> entity)
	{
		entity
			.ToTable("AspNetUserLogins")
			.HasKey(x => new { x.LoginProvider, x.ProviderKey, x.UserId });

	}
}