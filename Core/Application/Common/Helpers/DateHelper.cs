
using Microsoft.Extensions.Options;
using LandManager.Application.Common.Configuration;

namespace LandManager.Application.Common.Helpers;

public class DateHelper
{
	private readonly ApplicationSettings _appSettings;

	public DateHelper(IOptionsMonitor<ApplicationSettings> appSettings)
	{
		_appSettings = appSettings.CurrentValue;
	}

	public static int FiscalYear(DateTime date)
	{
		return date.Month < 10 ? date.Year : date.AddYears(1).Year;
	}

	public static int CurrentFiscalYear()
	{
		return FiscalYear(DateTime.Today);
	}

	// made this in addition to the static method above so I don't break all the proposal queries and commands that rely on it
	/// <summary>
	/// Returns the upcoming fiscal year if the associated app setting is true. Returns the current fiscal year if false
	/// </summary>
	/// <returns></returns>
	public int SimulatedFiscalYear()
	{
		return FiscalYear(DateTime.Today) + (_appSettings.SimulateUpcomingFiscalYear ? 1 : 0);
	}
}

