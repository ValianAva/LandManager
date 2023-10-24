using LandManager.Domain.Models;

namespace LandManager.Persistence.Configuration;

public class CommandConfiguration : IEntityTypeConfiguration<Command>
{
	public void Configure(EntityTypeBuilder<Command> entity)
	{
		entity.Property(e => e.Name)
			.IsRequired()
			.HasMaxLength(50);

		entity.HasOne(d => d.Service)
			.WithMany(p => p.Commands)
			.HasForeignKey(d => d.ServiceId)
			.OnDelete(DeleteBehavior.ClientSetNull);
	}
}