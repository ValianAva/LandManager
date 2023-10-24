namespace LandManager.Application.Common.Configuration;

public class UiSettings
{
	public string SiteName { get; set; }
	public string SiteColor { get; set; }
	public string PathBase { get; set; }
	public bool ShowDisclaimer { get; set; }
	public bool DebugForms { get; set; }
	public bool UsePost { get; set; }
	public string TinyApiKey { get; set; }
	public string PortalUrl { get; set; }
	public AppLinkSettings AppLinks { get; set; }
	public HelpSettings Help { get; set; }
	public HttpClientSettings HttpClient { get; set; }
	public OidcSettings Oidc { get; set; }
	public SentrySettings Sentry { get; set; }

	public class AppLinkSettings
	{
		public string Projects { get; set; }
		public string Proposals { get; set; }
		public string Sso { get; set; }
	}

	public class HelpSettings
	{
		public string Recipients { get; set; }
	}

	public class HttpClientSettings
	{
		public string BaseUrl { get; set; }
	}

	public class SentrySettings
	{
		public string Environment { get; set; }
		public string Dsn { get; set; }
	}

	public class OidcSettings
	{
		public string Authority { get; set; }
		public string Client_id { get; set; }
		public string Response_type { get; set; } = "code";
		public string Scope { get; set; }
		public bool RevokeTokensOnSignout { get; set; } = true;
		public bool Debug { get; set; } = false;
	}
}
