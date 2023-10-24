using Microsoft.Extensions.Options;
using ProjectsApplicationSettings = LandManager.Application.Projects.Common.Configuration.ApplicationSettings;
using ProposalsApplicationSettings = LandManager.Application.Proposals.Common.Configuration.ApplicationSettings;
using CommonApplicationSettings = LandManager.Application.Common.Configuration.ApplicationSettings;
using LandManager.Tests.Factories.Data.Projects;

namespace LandManager.Tests.Factories;

public static class AppSettingsFactory
{
	public static IOptionsMonitor<ProjectsApplicationSettings> CreateProjectsAppSettingsMonitor(bool lockSite = false)
	{
		var options = Substitute.For<IOptionsMonitor<ProjectsApplicationSettings>>();
		options.CurrentValue.Returns(new ProjectsApplicationSettings()
		{
			OtherParcelId = 1,
			LockSite = lockSite
		});

		return options;
	}

	public static IOptions<ProjectsApplicationSettings> CreateProjectsAppSettings(bool lockSite = false)
	{
		var options = Substitute.For<IOptions<ProjectsApplicationSettings>>();
		options.Value.Returns(new ProjectsApplicationSettings()
		{
			OtherParcelId = 1,
			LockSite = lockSite,
			OtherAgreementIds = new int[] { AgreementsData.Other }
		});

		return options;
	}

	public static IOptionsMonitor<ProposalsApplicationSettings> CreateProposalsAppSettingsMonitor(bool lockSite = false)
	{
		var options = Substitute.For<IOptionsMonitor<ProposalsApplicationSettings>>();
		options.CurrentValue.Returns(new ProposalsApplicationSettings()
		{
			OtherParcelId = 1,
			LockSite = lockSite
		});

		return options;
	}

	public static IOptions<ProposalsApplicationSettings> CreateProposalsAppSettings(bool lockSite = false)
	{
		var options = Substitute.For<IOptions<ProposalsApplicationSettings>>();
		options.Value.Returns(new ProposalsApplicationSettings()
		{
			OtherParcelId = 1,
			LockSite = lockSite,
		});

		return options;
	}

	public static IOptions<CommonApplicationSettings> CreateCommonAppSettings(bool lockSite = false)
	{
		var options = Substitute.For<IOptions<CommonApplicationSettings>>();
		options.Value.Returns(new CommonApplicationSettings()
		{
			OtherParcelId = 1,
			LockSite = lockSite
		});
		return options;
	}
}