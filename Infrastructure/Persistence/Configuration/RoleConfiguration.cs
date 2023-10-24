using LandManager.Domain.Models;

namespace LandManager.Persistence.Configuration;

public class RoleConfiguration : IEntityTypeConfiguration<Role>
{
	public void Configure(EntityTypeBuilder<Role> entity)
	{
		entity
			.ToTable("AspNetRoles");


	}
}