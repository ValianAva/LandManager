using LandManager.Domain.Models;

namespace LandManager.Persistence.Configuration;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
	public void Configure(EntityTypeBuilder<User> entity)
	{
		entity
			.ToTable("AspNetUsers");

		entity
			.Property(x => x.Id)
			.HasColumnType("nvarchar")
			.HasMaxLength(128)
			.IsRequired();

		entity
			.Property(x => x.Email)
			.HasColumnName("Email")
			.HasColumnType("nvarchar")
			.HasMaxLength(256);

		entity
			.Property(x => x.UserName)
			.HasColumnName("UserName")
			.HasColumnType("nvarchar")
			.HasMaxLength(256)
			.IsRequired();

		entity
			.Property(x => x.HasAdminAccess)
			.HasColumnName("HasAdminAccess")
			.HasColumnType("bit")
			.IsRequired();

		entity
			.HasMany(x => x.ApplicationAccess)
			.WithOne(x => x.User)
			.HasForeignKey(x => x.UserId);

		entity
			.Property(x => x.ProjectsFirstLogin)
			.HasColumnName("ProjectsFirstLogin")
			.HasColumnType("bit")
			.IsRequired();

		entity
		   .Property(x => x.ProposalFirstLogin)
		   .HasColumnName("ProposalFirstLogin")
		   .HasColumnType("bit")
		   .IsRequired();

		entity.HasMany(d => d.UserRoles)
			.WithOne(d => d.User)
			.IsRequired()
			.HasForeignKey(d => d.UserId);

		// from https://stackoverflow.com/questions/65043926/entity-framework-core-many-to-many-change-navigation-property-names 
		entity.HasMany(u => u.Installations)
			.WithMany(i => i.Users)
			.UsingEntity<Dictionary<string, object>>("UserInstallation",
			x => x.HasOne<Installation>().WithMany().HasForeignKey("InstallationId"),
			x => x.HasOne<User>().WithMany().HasForeignKey("UserId"),
			x => x.ToTable("UserInstallation"));

		// from https://stackoverflow.com/questions/65043926/entity-framework-core-many-to-many-change-navigation-property-names 
		entity.HasMany(u => u.Partners)
			.WithMany(i => i.Users)
			.UsingEntity<Dictionary<string, object>>("UserPartner",
			x => x.HasOne<Partner>().WithMany().HasForeignKey("PartnerId"),
			x => x.HasOne<User>().WithMany().HasForeignKey("UserId"),
			x => x.ToTable("UserPartner"));

	}
}