using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using LandManager.Tests.Factories.Data;
using LandManager.Tests.Factories.Data.Projects;
using LandManager.Tests.Factories.Data.Proposals;

namespace LandManager.Tests.Factories;

public static class ContextFactory
{
	public static Persistence.AppContext Create()
	{
		// https://stackoverflow.com/a/63125585
		SQLitePCL.raw.SetProvider(new SQLitePCL.SQLite3Provider_sqlite3());

		// Create and open a connection. This creates the SQLite in-memory database, which will persist until the connection is closed
		// at the end of the test (see Dispose below).
		var connection = new SqliteConnection("Filename=:memory:;Foreign Keys=False");
		connection.Open();

		// These options will be used by the context instances in this test suite, including the connection opened above.
		var contextOptions = new DbContextOptionsBuilder<Persistence.AppContext>()
			.UseSqlite(connection, x => x.UseNetTopologySuite())
			.EnableSensitiveDataLogging()
			.Options;

		// Create the schema and seed some data
		// the repeated calls to savechanges are to save data before adding
		// foreign key data
		var context = new Persistence.AppContext(contextOptions);

		context.Database.EnsureCreated();

		#region dbo
		context.Service.AddRange(ServicesData.Seed());
		context.State.AddRange(StatesData.Seed());
		context.SaveChanges();

		context.Command.AddRange(CommandsData.Seed());
		context.Installation.AddRange(InstallationsData.Seed(context));
		context.Benefit.AddRange(BenefitsData.Seed());
		context.Landuse.AddRange(LanduseData.Seed());
		context.ParcelStatus.AddRange(ParcelStatusesData.Seed());
		context.DevelopmentPotential.AddRange(DevelopmentPotentialData.Seed());
		context.CurrentZoning.AddRange(CurrentZoningData.Seed());

		context.StatutoryJustification.AddRange(StatutoryJustificationsData.Seed());
		context.SaveChanges();
		context.Parcel.AddRange(ParcelsData.Seed());
		#endregion

		#region projects
		context.AgreementType.AddRange(AgreementTypesData.Seed());
		context.ExpenditureCategory.AddRange(ExpenditureCategoriesData.Seed());
		context.ExpenditureType.AddRange(ExpenditureTypesData.Seed());
		context.NonCashType.AddRange(NonCashTypesData.Seed());
		context.ObligationCategories.AddRange(ObligationCategoriesData.Seed());
		context.Source.AddRange(SourcesData.Seed());
		context.ProjectsFileType.AddRange(ProjectsFileTypesData.Seed());
		context.SaveChanges();
		context.Agreement.AddRange(AgreementsData.Seed(context));
		context.SaveChanges();
		context.Project.AddRange(ProjectsData.Seed(context));
		context.SaveChanges();
		context.Effort.AddRange(EffortsData.Seed());
		context.SaveChanges();
		context.EffortPartnerFunding.AddRange(EffortPartnerFundingData.Seed());
		context.Obligation.AddRange(ObligationsData.Seed());
		context.SaveChanges();
		context.Expenditure.AddRange(ExpendituresData.Seed());
		#endregion

		#region proposals
		context.ScoreSection.AddRange(ScoreSectionsData.Seed());
		context.ScoreMethod.AddRange(ScoreMethodsData.Seed());
		context.SaveChanges();
		context.ScoreCriteria.AddRange(ScoreCriteriaData.Seed());
		context.Proposal.AddRange(Data.Proposals.ProposalsData.Seed(context));
		context.SaveChanges();
		context.FiveYearDescription.AddRange(FiveYearDescriptionData.Seed());
		context.OneYearInformation.AddRange(OneYearInformationData.Seed());
		context.SharedEvaluation.AddRange(SharedEvaluationsData.Seed());
		context.OutYear.AddRange(OutYearsData.Seed());
		context.SaveChanges();
		context.AgreementArea.AddRange(AgreementAreasData.Seed());
		#endregion

		context.SaveChanges();
		return context;
	}

	public static void Destroy(Persistence.AppContext context)
	{
		context.Database.EnsureDeleted();
		context.Dispose();
	}
}