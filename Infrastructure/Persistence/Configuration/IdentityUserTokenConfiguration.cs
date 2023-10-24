
using Microsoft.AspNetCore.Identity;

namespace LandManager.Persistence.Configuration;

public class IdentityUserTokenConfiguration : IEntityTypeConfiguration<IdentityUserToken<string>>
{
	public void Configure(EntityTypeBuilder<IdentityUserToken<string>> entity)
	{
		entity
			.ToTable("AspNetUserTokens")
			.HasKey(x => new { x.UserId, x.LoginProvider, x.Name });

	}
}