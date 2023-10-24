using System.ComponentModel.DataAnnotations;

namespace LandManager.Domain.Enums;

public enum AccessLevels
{
	[Display(Name = "No Access")]
	None = 1,
	[Display(Name = "Read Only Access")]
	ReadOnly = 2,
	[Display(Name = "Write Access")]
	Write = 3
}