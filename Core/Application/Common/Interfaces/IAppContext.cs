using LandManager.Domain.Models;
using LandManager.Domain.Models.Projects;
using Projects = LandManager.Domain.Models.Projects;
using Proposals = LandManager.Domain.Models.Proposals;

namespace LandManager.Application.Common.Interfaces;

public interface IAppContext
{
	#region dbo
	DbSet<Benefit> Benefit { get; set; }
	DbSet<ClimateHazard> ClimateHazard { get; set; }
	DbSet<Command> Command { get; set; }
	DbSet<CurrentZoning> CurrentZoning { get; set; }
	DbSet<DevelopmentPotential> DevelopmentPotential { get; set; }
	DbSet<Installation> Installation { get; set; }
	DbSet<KnownSpecies> KnownSpecies { get; set; }
	DbSet<Landuse> Landuse { get; set; }
	DbSet<Parcel> Parcel { get; set; }
	DbSet<ParcelClimateHazard> ParcelClimateHazard { get; set; }
	DbSet<ParcelResilienceAction> ParcelResilienceAction { get; set; }
	DbSet<ParcelStatus> ParcelStatus { get; set; }
	DbSet<Partner> Partner { get; set; }
	DbSet<PartnerType> PartnerType { get; set; }
	DbSet<PropertyInterest> PropertyInterest { get; set; }
	DbSet<RtmAdmin> RtmAdmin { get; set; }
	DbSet<RtmMaintenance> RtmMaintenance { get; set; }
	DbSet<RtmResearch> RtmResearch { get; set; }
	DbSet<ResilienceAction> ResilienceAction { get; set; }
	DbSet<Service> Service { get; set; }
	DbSet<SpeciesStatus> SpeciesStatus { get; set; }
	DbSet<State> State { get; set; }
	DbSet<StatutoryJustification> StatutoryJustification { get; set; }
	DbSet<SuspectedSpecies> SuspectedSpecies { get; set; }
	#endregion

	#region projects
	DbSet<Projects.Agreement> Agreement { get; set; }
	DbSet<Projects.AgreementReport> AgreementReport { get; set; }
	DbSet<Projects.AgreementType> AgreementType { get; set; }
	DbSet<Projects.Allocation> Allocation { get; set; }
	DbSet<Projects.Effort> Effort { get; set; }
	DbSet<Projects.EffortPartnerFunding> EffortPartnerFunding { get; set; }
	DbSet<Projects.Expenditure> Expenditure { get; set; }
	DbSet<Projects.ExpenditureReport> ExpenditureReport { get; set; }
	DbSet<Projects.ExpenditureCategory> ExpenditureCategory { get; set; }
	DbSet<Projects.ExpenditureType> ExpenditureType { get; set; }
	DbSet<Projects.File> ProjectsFile { get; set; }
	DbSet<Projects.Folder> ProjectsFolder { get; set; }
	DbSet<Projects.FileType> ProjectsFileType { get; set; }
	DbSet<Projects.NonCashType> NonCashType { get; set; }
	DbSet<Projects.Obligation> Obligation { get; set; }
	DbSet<Projects.ObligationCategory> ObligationCategories { get; set; }
	DbSet<Projects.ObligationReport> ObligationReport { get; set; }
	DbSet<Projects.ParcelReport> ParcelReport { get; set; }
	DbSet<Projects.ParcelResilienceActionReport> ParcelResilienceActionReport { get; set; }
	DbSet<Projects.Project> Project { get; set; }
	DbSet<Projects.ProjectReport> ProjectReport { get; set; }
	DbSet<Projects.ResilienceObligationReport> ResilienceObligationReport { get; set; }
	DbSet<Projects.StaticResilienceObligationReport> StaticResilienceObligationReport { get; set; }
	DbSet<Projects.Source> Source { get; set; }
	DbSet<Projects.StatusUpdate> StatusUpdate { get; set; }
	#endregion

	#region proposals
	DbSet<Proposals.ActivityLog> ActivityLog { get; set; }
	DbSet<Proposals.ActivityLogType> ActivityLogType { get; set; }
	DbSet<Proposals.AgreementArea> AgreementArea { get; set; }
	DbSet<Proposals.CapabilityValuation> CapabilityValuation { get; set; }
	DbSet<Proposals.CapabilityValuationType> CapabilityValuationType { get; set; }
	DbSet<Proposals.CapacityImpacted> CapacityImpacted { get; set; }
	DbSet<Proposals.CapacityImpactedUnit> CapacityImpactedUnit { get; set; }
	DbSet<Proposals.CapacityProtected> CapacityProtected { get; set; }
	DbSet<Proposals.CapacityProtectedType> CapacityProtectedType { get; set; }
	DbSet<Proposals.CapacityProtectedUnit> CapacityProtectedUnit { get; set; }
	DbSet<Proposals.ClimateHazardMetric> ClimateHazardMetric { get; set; }
	DbSet<Proposals.Comment> Comment { get; set; }
	DbSet<Proposals.CriteriaEvaluation> CriteriaEvaluation { get; set; }
	DbSet<Proposals.EncroachmentCause> EncroachmentCause { get; set; }
	DbSet<Proposals.EncroachmentItem> EncroachmentItem { get; set; }
	DbSet<Proposals.EncroachmentItemClimateHazardMetric> EncroachmentItemClimateHazardMetric { get; set; }
	DbSet<Proposals.EntityDeletion> EntityDeletion { get; set; }
	DbSet<Proposals.File> File { get; set; }
	DbSet<Proposals.FileType> FileType { get; set; }
	DbSet<Proposals.FiveYearDescription> FiveYearDescription { get; set; }
	DbSet<Proposals.Impact> Impact { get; set; }
	DbSet<Proposals.OneYearInformation> OneYearInformation { get; set; }
	DbSet<Proposals.OutYear> OutYear { get; set; }
	DbSet<Proposals.PartnerAgreement> PartnerAgreement { get; set; }
	DbSet<Proposals.PartnerInstallationReport> PartnerInstallationReport { get; set; }
	DbSet<Proposals.PriorityArea> PriorityArea { get; set; }
	DbSet<Proposals.Proposal> Proposal { get; set; }
	DbSet<Proposals.ProposalStatus> ProposalStatus { get; set; }
	DbSet<Proposals.ProposalViability> ProposalViability { get; set; }
	DbSet<Proposals.RestrictedActivity> RestrictedActivity { get; set; }
	DbSet<Proposals.ScoreCompletion> ScoreCompletion { get; set; }
	DbSet<Proposals.ScoreCriteria> ScoreCriteria { get; set; }
	DbSet<Proposals.ScoreMethod> ScoreMethod { get; set; }
	DbSet<Proposals.ScoreSection> ScoreSection { get; set; }
	DbSet<Proposals.ScoreValue> ScoreValue { get; set; }
	DbSet<Proposals.SectionStatus> SectionStatus { get; set; }
	DbSet<Proposals.SharedEvaluation> SharedEvaluation { get; set; }
	DbSet<Proposals.UsageProtected> UsageProtected { get; set; }
	DbSet<Proposals.UsageProtectedTimeframe> UsageProtectedTimeframe { get; set; }
	DbSet<Proposals.PartnerStatus> PartnerStatus { get; set; }
	DbSet<Proposals.UserSurvey> ProposalUserSurvey { get; set; }
	#endregion

	#region sso
	DbSet<User> Users { get; set; }
	DbSet<Role> Roles { get; set; }
	#endregion

	Task<int> SaveChangesAsync(CancellationToken cancellationToken);
	int SaveChanges();
	Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry Entry(object entity);
}