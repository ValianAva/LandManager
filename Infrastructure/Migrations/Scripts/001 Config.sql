CREATE TABLE [dbo].[Config]
(
	[ApplicationName] [nvarchar](50) NOT NULL,
	[SectionName] [nvarchar](50) NOT NULL,
	[SettingName] [nvarchar](50) NOT NULL,
	[SettingValue] [nvarchar](1000) NOT NULL,
)
GO

INSERT INTO [dbo].[Config]
	(ApplicationName, SectionName, SettingName, SettingValue)
VALUES
	('', 'Smtp', 'HostServer', ''),
	('', 'Smtp', 'FromAddress', ''),
	('', 'Smtp', 'Username', ''),
	('', 'Smtp', 'Password', ''),
	('', 'Smtp', 'Port', '587'),
	('sso', 'Smtp', 'SubjectPrefix', 'LandManager SSO'),
	('sso', 'Smtp', 'SuppressMessages', 'true'),
	('proposals', 'Smtp', 'SubjectPrefix', 'LandManager Proposals'),
	('proposals', 'Smtp', 'SuppressMessages', 'true'),
	('projects', 'Smtp', 'SubjectPrefix', 'LandManager Projects'),
	('projects', 'Smtp', 'SuppressMessages', 'true'),
	('', 'Application', 'OtherParcelId', '1'),
	('', 'Application', 'UsePost', 'false'),
	('', 'Application', 'DisableHttpsRedirect', 'false'),
	('projects', 'Application', 'LockSite', 'false'),
	('projects', 'Application', 'OtherAgreementIds:0', '176'),
	('projects', 'Application', 'OtherAgreementIds:1', '177'),
	('projects', 'Application', 'OtherObligationProjectId', '1111')
	('proposals', 'Application', 'LockSite', 'false'),
	('proposals', 'Application', 'DemoMode', 'true'),
	('proposals', 'Application', 'ShareEvaluations', 'false'),
	('proposals', 'Application', 'SurveyLink', 'https://www.surveymonkey.com/r/X2BB6HV'),
	('proposals', 'Application', 'MaintenanceMode', 'false'),
	('projects', 'Application', 'SimulateUpcomingFiscalYear', 'false'),
	('proposals', 'Application', 'SimulateUpcomingFiscalYear', 'false'),
	('', 'Oidc', 'Authority', 'https://app.com/sso/idserver'),
	('sso', 'Application', 'BaseUrl', 'https://app.com'),
	('proposals', 'Application', 'BaseUrl', 'https://app.com/proposals'),
	('projects', 'Application', 'BaseUrl', 'https://app.com/projects'),
	('sso', 'Ui', 'SiteName', 'LandManager SSO'),
	('sso', 'Ui', 'SiteColor', '#C82914'),
	('sso', 'Ui', 'PathBase', ''),
	('', 'Ui', 'ShowDisclaimer', 'true'),
	('', 'Ui', 'DebugForms', 'false'),
	('', 'Ui', 'UsePost', 'false'),
	('', 'Ui', 'AppLinks:Projects', 'https://app.com/projects'),
	('', 'Ui', 'AppLinks:Proposals', 'https://app.com/proposals'),
	('', 'Ui', 'AppLinks:Sso', 'https://app.com'),
	('', 'Ui', 'Help:Recipients', 'test@gmail.com;'),
	('', 'Ui', 'Oidc:Authority', 'https://app.com/sso/idserver'),
	('sso', 'Ui', 'HttpClient:BaseUrl', 'https://app.com/api/'),
	('sso', 'Ui', 'Oidc:Client_id', 'app.sso'),
	('', 'Ui', 'Oidc:Response_type', 'code'),
	('sso', 'Ui', 'Oidc:Scope', 'openid profile app.sso.api'),
	('', 'Ui', 'Oidc:RevokeTokensOnSignout', 'true'),
	('', 'Ui', 'Oidc:Debug', 'false'),
	('', 'Ui', 'Sentry:Environment', 'Production'),
	('sso', 'Ui', 'Sentry:Dsn', 'https://734b242a0a9447ad81d8cfc65b885d8b@o283074.ingest.sentry.io/5270380')
GO

ALTER TABLE Config ADD DebugValue [nvarchar](1000) CONSTRAINT DF_DebugValue DEFAULT('') NOT NULL
GO

UPDATE Config
SET DebugValue = SettingValue
GO

INSERT INTO Config (ApplicationName, SectionName, SettingName, SettingValue)
VALUES 
	('', 'Ui', 'HttpClient:SsoBaseUrl', 'https://app.osd.mil/api/'),
	('', 'Ui', 'HttpClient:ProposalsBaseUrl', 'https://app.osd.mil/proposals/api/'),
	('', 'Ui', 'HttpClient:ProjectsBaseUrl', 'https://app.osd.mil/projects/api/'),
	('', 'Ui', 'TinyApiKey', '25hz56xf3jf0mo4gcs6ovsa9g1h86r45frt6brsmy4zyofsm'),
	('', 'Ui', 'PortalUrl', 'https://arcgis.com'),
	('', 'Ui', 'ExcludedEntities:Parcel', '1'),

	('projects', 'Ui', 'SiteName', 'LandManager Projects'),
	('projects', 'Ui', 'SiteColor', '#265d7e'),
	('projects', 'Ui', 'PathBase', 'projects'),
	('projects', 'Ui', 'HttpClient:BaseUrl', 'https://app.osd.mil/projects/api/'),	
	('projects', 'Ui', 'Oidc:Client_id', 'app.projects'),
	('projects', 'Ui', 'Oidc:Scope', 'openid profile app.projects.api app.proposaltracker.api app.sso.api'),
	('projects', 'Ui', 'Sentry:Dsn', 'https://486ad8fcc7454230a6342686f7ad6019@o283074.ingest.sentry.io/1511897'),	

	('proposals', 'Ui', 'SiteName', 'LandManager Proposals'),
	('proposals', 'Ui', 'SiteColor', '#687350'),
	('proposals', 'Ui', 'PathBase', 'proposals'),
	('proposals', 'Ui', 'HttpClient:BaseUrl', 'https://app.osd.mil/proposals/api/'),	
	('proposals', 'Ui', 'Oidc:Client_id', 'app.proposaltracker'),
	('proposals', 'Ui', 'Oidc:Scope', 'openid profile app.projects.api app.proposaltracker.api app.sso.api'),
	('proposals', 'Ui', 'Sentry:Dsn', 'https://d438f9287bfd497e9ffdbf4feebee894@o283074.ingest.sentry.io/1510904')

UPDATE Config
SET DebugValue = SettingValue
WHERE DebugValue = ''