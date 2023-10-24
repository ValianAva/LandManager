
using Microsoft.AspNetCore.Identity;

namespace LandManager.Persistence.Configuration;

public class IdentityRoleClaimConfiguration : IEntityTypeConfiguration<IdentityRoleClaim<string>>
{
	public void Configure(EntityTypeBuilder<IdentityRoleClaim<string>> entity)
	{
		entity
			.ToTable("AspNetRoleClaims");

	}
}