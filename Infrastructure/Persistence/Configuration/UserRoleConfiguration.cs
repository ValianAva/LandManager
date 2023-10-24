using LandManager.Domain.Models;

namespace LandManager.Persistence.Configuration;

public class UserRoleConfiguration : IEntityTypeConfiguration<UserRole>
{
	public void Configure(EntityTypeBuilder<UserRole> entity)
	{
		entity
			.ToTable("AspNetUserRoles")
			.HasKey(x => new { x.UserId, x.RoleId });

		entity.HasOne(d => d.Role)
			.WithMany(d => d.UserRoles)
			.IsRequired()
			.HasForeignKey(d => d.RoleId);


	}
}