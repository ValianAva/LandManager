
using Microsoft.AspNetCore.Identity;

namespace LandManager.Persistence.Configuration;

public class IdentityUserClaimConfiguration : IEntityTypeConfiguration<IdentityUserClaim<string>>
{
	public void Configure(EntityTypeBuilder<IdentityUserClaim<string>> entity)
	{
		entity
			.ToTable("AspNetUserClaims")
			.HasKey(x => x.Id);
	}
}