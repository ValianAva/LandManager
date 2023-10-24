namespace LandManager.Application.Common.Configuration;

public class ApplicationSettings
{
	public bool LockSite { get; set; }
	public bool DemoMode { get; set; }
	public bool UsePost { get; set; }
	public bool DisableHttpsRedirect { get; set; }
	public int OtherParcelId { get; set; }
	public bool SimulateUpcomingFiscalYear { get; set; }

	/// <summary>
	/// Base URL of the API's primary client application.
	/// </summary>
	/// <value></value>
	public string BaseUrl { get; set; }
}


