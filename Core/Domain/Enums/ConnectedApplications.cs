using System.ComponentModel.DataAnnotations;

namespace LandManager.Domain.Enums;

public enum ConnectedApplications
{
	[Display(Name = "Proposal Tracker")]
	ProposalTracker = 1,
	Projects = 2,
}