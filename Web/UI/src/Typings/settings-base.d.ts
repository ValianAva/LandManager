declare module 'settings-base' {
	interface OidcSettings {
		authority: string;
		client_id: string;
		response_type: string;
		scope: string;
		revokeTokensOnSignout: boolean;
		debug: boolean;
	}

	export interface HttpClientSettings {
		baseUrl: string;
		ssoBaseUrl: string;
	}

	interface SentrySettings {
		environment: string;
		dsn: string;
	}

	interface AppLinks {
		projects: string;
		proposals: string;
		sso: string;
	}

	export interface Settings {
		oidc: OidcSettings;
		httpClient: HttpClientSettings;
		siteName: string;
		siteColor: string;
		pathBase: string;
		showDisclaimer: boolean;
		usePost: boolean;
		help: {
			recipients: string;
		};
		sentry: SentrySettings;
		appLinks: AppLinks;
		tinyApiKey: string;
		portalUrl: string;
		debugForms: boolean;
	}
}
