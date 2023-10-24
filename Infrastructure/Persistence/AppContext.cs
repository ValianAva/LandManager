using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using LandManager.Application.Common.Interfaces;
using LandManager.Domain.Models;
using Projects = LandManager.Domain.Models.Projects;
using Proposals = LandManager.Domain.Models.Proposals;

namespace LandManager.Persistence;

public class AppContext : IdentityDbContext<User, Role, string, IdentityUserClaim<string>, UserRole, IdentityUserLogin<string>,
IdentityRoleClaim<string>, IdentityUserToken<string>>, IAppContext
{
	public AppContext(DbContextOptions<AppContext> options)
		: base(options)
	{
	}

	#region dbo
	public virtual DbSet<Benefit> Benefit { get; set; }
	public virtual DbSet<ClimateHazard> ClimateHazard { get; set; }
	public virtual DbSet<Command> Command { get; set; }
	public virtual DbSet<CurrentZoning> CurrentZoning { get; set; }
	public virtual DbSet<DevelopmentPotential> DevelopmentPotential { get; set; }
	public virtual DbSet<Installation> Installation { get; set; }
	public virtual DbSet<KnownSpecies> KnownSpecies { get; set; }
	public virtual DbSet<Landuse> Landuse { get; set; }
	public virtual DbSet<Parcel> Parcel { get; set; }
	public virtual DbSet<ParcelClimateHazard> ParcelClimateHazard { get; set; }
	public virtual DbSet<ParcelResilienceAction> ParcelResilienceAction { get; set; }
	public virtual DbSet<ParcelStatus> ParcelStatus { get; set; }
	public virtual DbSet<Partner> Partner { get; set; }
	public virtual DbSet<PartnerType> PartnerType { get; set; }
	public virtual DbSet<PropertyInterest> PropertyInterest { get; set; }
	public virtual DbSet<ResilienceAction> ResilienceAction { get; set; }
	public virtual DbSet<Service> Service { get; set; }
	public virtual DbSet<SpeciesStatus> SpeciesStatus { get; set; }
	public virtual DbSet<StatutoryJustification> StatutoryJustification { get; set; }
	public virtual DbSet<State> State { get; set; }
	public virtual DbSet<SuspectedSpecies> SuspectedSpecies { get; set; }
	#endregion

	#region projects
	public virtual DbSet<Projects.Agreement> Agreement { get; set; }
	public virtual DbSet<Projects.AgreementReport> AgreementReport { get; set; }
	public virtual DbSet<Projects.AgreementType> AgreementType { get; set; }
	public virtual DbSet<Projects.Allocation> Allocation { get; set; }
	public virtual DbSet<Projects.Effort> Effort { get; set; }
	public virtual DbSet<Projects.EffortPartnerFunding> EffortPartnerFunding { get; set; }
	public virtual DbSet<Projects.Expenditure> Expenditure { get; set; }
	public virtual DbSet<Projects.ExpenditureReport> ExpenditureReport { get; set; }
	public virtual DbSet<Projects.ExpenditureCategory> ExpenditureCategory { get; set; }
	public virtual DbSet<Projects.ExpenditureType> ExpenditureType { get; set; }
	public virtual DbSet<Projects.File> ProjectsFile { get; set; }
	public virtual DbSet<Projects.Folder> ProjectsFolder { get; set; }
	public virtual DbSet<Projects.FileType> ProjectsFileType { get; set; }
	public virtual DbSet<Projects.NonCashType> NonCashType { get; set; }
	public virtual DbSet<Projects.Obligation> Obligation { get; set; }
	public virtual DbSet<Projects.ObligationCategory> ObligationCategories { get; set; }
	public virtual DbSet<Projects.ObligationReport> ObligationReport { get; set; }
	public virtual DbSet<Projects.ParcelReport> ParcelReport { get; set; }
	public virtual DbSet<Projects.ParcelResilienceActionReport> ParcelResilienceActionReport { get; set; }
	public virtual DbSet<Projects.Project> Project { get; set; }
	public virtual DbSet<Projects.ProjectReport> ProjectReport { get; set; }
	public virtual DbSet<Projects.ResilienceObligationReport> ResilienceObligationReport { get; set; }
	public virtual DbSet<Projects.StaticResilienceObligationReport> StaticResilienceObligationReport { get; set; }
	public virtual DbSet<Projects.RtmAdmin> RtmAdmin { get; set; }
	public virtual DbSet<Projects.RtmMaintenance> RtmMaintenance { get; set; }
	public virtual DbSet<Projects.RtmResearch> RtmResearch { get; set; }
	public virtual DbSet<Projects.Source> Source { get; set; }
	public virtual DbSet<Projects.StatusUpdate> StatusUpdate { get; set; }
	public virtual DbSet<Projects.ParcelReportAdvanaLive> ParcelReportAdvanaLive { get; set; }
	public virtual DbSet<Projects.ObligationReportAdvanaLive> ObligationReportAdvanaLive { get; set; }
	public virtual DbSet<Projects.ExpenditureReportAdvanaLive> ExpenditureReportAdvanaLive { get; set; }
	public virtual DbSet<Projects.ResilienceActionReportAdvanaLive> ResilienceActionReportAdvanaLive { get; set; }
	public virtual DbSet<Projects.SecondaryBenefitReportAdvanaLive> SecondaryBenefitReportAdvanaLive { get; set; }
	#endregion

	#region proposals
	public virtual DbSet<Proposals.ActivityLog> ActivityLog { get; set; }
	public virtual DbSet<Proposals.ActivityLogType> ActivityLogType { get; set; }
	public virtual DbSet<Proposals.AgreementArea> AgreementArea { get; set; }
	public virtual DbSet<Proposals.CapabilityValuation> CapabilityValuation { get; set; }
	public virtual DbSet<Proposals.CapabilityValuationType> CapabilityValuationType { get; set; }
	public virtual DbSet<Proposals.CapacityImpacted> CapacityImpacted { get; set; }
	public virtual DbSet<Proposals.CapacityImpactedUnit> CapacityImpactedUnit { get; set; }
	public virtual DbSet<Proposals.CapacityProtected> CapacityProtected { get; set; }
	public virtual DbSet<Proposals.CapacityProtectedType> CapacityProtectedType { get; set; }
	public virtual DbSet<Proposals.CapacityProtectedUnit> CapacityProtectedUnit { get; set; }
	public virtual DbSet<Proposals.ClimateHazardMetric> ClimateHazardMetric { get; set; }
	public virtual DbSet<Proposals.Comment> Comment { get; set; }
	public virtual DbSet<Proposals.CriteriaEvaluation> CriteriaEvaluation { get; set; }
	public virtual DbSet<Proposals.EncroachmentCause> EncroachmentCause { get; set; }
	public virtual DbSet<Proposals.EncroachmentItem> EncroachmentItem { get; set; }
	public virtual DbSet<Proposals.EncroachmentItemClimateHazardMetric> EncroachmentItemClimateHazardMetric { get; set; }
	public virtual DbSet<Proposals.EntityDeletion> EntityDeletion { get; set; }
	public virtual DbSet<Proposals.File> File { get; set; }
	public virtual DbSet<Proposals.FileType> FileType { get; set; }
	public virtual DbSet<Proposals.FiveYearDescription> FiveYearDescription { get; set; }
	public virtual DbSet<Proposals.Impact> Impact { get; set; }
	public virtual DbSet<Proposals.OneYearInformation> OneYearInformation { get; set; }
	public virtual DbSet<Proposals.OutYear> OutYear { get; set; }
	public virtual DbSet<Proposals.PartnerAgreement> PartnerAgreement { get; set; }
	public virtual DbSet<Proposals.PartnerInstallationReport> PartnerInstallationReport { get; set; }
	public virtual DbSet<Proposals.PriorityArea> PriorityArea { get; set; }
	public virtual DbSet<Proposals.Proposal> Proposal { get; set; }
	public virtual DbSet<Proposals.ProposalStatus> ProposalStatus { get; set; }
	public virtual DbSet<Proposals.ProposalViability> ProposalViability { get; set; }
	public virtual DbSet<Proposals.RestrictedActivity> RestrictedActivity { get; set; }
	public virtual DbSet<Proposals.ScoreCompletion> ScoreCompletion { get; set; }
	public virtual DbSet<Proposals.ScoreCriteria> ScoreCriteria { get; set; }
	public virtual DbSet<Proposals.ScoreMethod> ScoreMethod { get; set; }
	public virtual DbSet<Proposals.ScoreSection> ScoreSection { get; set; }
	public virtual DbSet<Proposals.ScoreValue> ScoreValue { get; set; }
	public virtual DbSet<Proposals.SectionStatus> SectionStatus { get; set; }
	public virtual DbSet<Proposals.SharedEvaluation> SharedEvaluation { get; set; }
	public virtual DbSet<Proposals.UsageProtected> UsageProtected { get; set; }
	public virtual DbSet<Proposals.UsageProtectedTimeframe> UsageProtectedTimeframe { get; set; }
	public virtual DbSet<Proposals.PartnerStatus> PartnerStatus { get; set; }
	public virtual DbSet<Proposals.UserSurvey> ProposalUserSurvey { get; set; }
	#endregion

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppContext).Assembly);

		if (!Database.IsSqlServer())
		{
			// configure conflicting table names here since SQLite doesn't support schemas
			// and I couldn't get the Datbase property inside each EF configuration file
			modelBuilder.Entity<Projects.FileType>().ToTable("projectsFileType");
			modelBuilder.Entity<Projects.File>().ToTable("projectsFile");

			// SQLite can't aggregate decimal
			modelBuilder.Entity<Projects.Obligation>().Property(p => p.Amount).HasConversion<double>();
			modelBuilder.Entity<Projects.Expenditure>().Property(p => p.Amount).HasConversion<double>();
		}
	}
}
