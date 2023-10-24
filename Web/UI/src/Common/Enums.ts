export enum Roles {
	null = '',
	admin = 'Admin',
	hq = 'HQ',
	region1 = 'Region1',
	region2 = 'Region2',
	installation = 'Installation',
	partner = 'Partner',
	reviewer = 'Reviewer',
}

export enum ParcelStatuses {
	New = 1,
	Pending = 2,
	Funded = 3,
	Executed = 4,
	Archived = 5,
}

export type ParcelStatusNames = 'New' | 'Pending' | 'Funded' | 'Executed' | 'Archived';

export enum Services {
	Admin = 1,
	Research = 2,
	Maintenance = 3,
}

export enum Applications {
	ProposalTracker = 1,
	Projects = 2,
}

export enum AccessLevels {
	None = 1,
	ReadOnly = 2,
	Write = 3,
}

export enum ProposalEvaluationCriterias {
	MissionCapabilities = 1,
	ValueOfCapability = 2,
	CapacityProtected = 3,
	UsageProtected = 4,
	DesiredEndState = 5,
	HolisticEncroachmentStrategy = 6,
	HolisticPlanningStrategy = 7,
	InstallationCommunityPlanning = 8,
	JLUSStatus = 9,
	NonInternalPlans = 10,
	ProposedActions = 11,

	EncroachmentThreat = 12,
	EncroachmentMatrix = 13,
	EncroachmentRisk = 14,
	TimeframeForImpacts = 15,
	CapacityImpacted = 16,
	RiskDetermination = 17,
	StrategicBenefit = 18,
	ValueOf5YearToMission = 19,
	BenefitOfPartnership = 20,
	RelievingEncroachmentImpacts = 21,
	RecoveryPlanning = 22,

	CurrentLandUse = 23,
	SecondaryBenefits = 24,
	PartnerContributions = 25,
	ServiceFunding = 26,
	ProgressTowardCompletion = 27,
	LikelihoodOfProjects = 28,
	ProjectInnovation = 29,
	ServicePriority = 30,
}
