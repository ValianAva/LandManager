using LandManager.Domain.Models;

namespace LandManager.Tests.Factories.Data;

public static class CommandsData
{
	public const int Imcom = 1;
	public const int Ngb = 2;

	public static Command[] Seed()
	{
		return new Command[] {
			new Command() {
				Id = Imcom,
				Name = "IMCOM",
				ServiceId = Domain.Enums.Services.Admin
			},
			new Command() {
				Id = Ngb,
				Name = "NGB",
				ServiceId = Domain.Enums.Services.Admin
			},

		};
	}
}