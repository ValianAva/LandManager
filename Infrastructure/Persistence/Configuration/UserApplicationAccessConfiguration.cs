using LandManager.Domain.Models;

namespace LandManager.Persistence.Configuration;

public class UserApplicationAccessConfiguration : IEntityTypeConfiguration<UserApplicationAccess>
{
	public void Configure(EntityTypeBuilder<UserApplicationAccess> entity)
	{
		entity
			.ToTable("UserApplicationAccess");

		entity
			.HasKey(x => new { x.UserId, x.ConnectedApplicationId });

		entity
			.Property(x => x.UserId)
			.HasColumnType("nvarchar")
			.HasMaxLength(128)
			.IsRequired();

		entity
			.Property(x => x.ConnectedApplicationId)
			.HasColumnType("int")
			.IsRequired();

		entity
			.Property(x => x.AccessLevelId)
			.HasColumnType("int")
			.IsRequired();

		entity.HasOne(d => d.User)
			.WithMany(p => p.ApplicationAccess)
			.HasForeignKey(d => d.UserId)
			.OnDelete(DeleteBehavior.Cascade);

		entity.HasOne(d => d.ConnectedApplication)
			.WithMany(p => p.UserApplicationAccess)
			.HasForeignKey(d => d.ConnectedApplicationId)
			.OnDelete(DeleteBehavior.Cascade);

		entity.HasOne(d => d.AccessLevel)
			.WithMany(p => p.UserApplicationAccess)
			.HasForeignKey(d => d.AccessLevelId)
			.OnDelete(DeleteBehavior.Cascade);
	}
}