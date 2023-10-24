import { Roles } from 'Common/Enums';
import { User } from 'oidc-client-ts';

export type Apps = 'Projects' | 'ProposalTracker' | 'SSO';

export class LoggedInUser {
	email = '';
	familyName = '';
	givenName = '';
	name = '';
	phoneNumber = '';
	preferredUsername = '';
	role: Roles = Roles.null;
	guid = '';
	hasAdminAccess = false;
	installations: number[] = [];
	partners: number[] = [];
	service = 0;
	isReadOnly = true; // seems best to default this to most restrictive and adjust from there
	accessToken = '';
	installationNames: string[] = [];
	/** An array of application access strings. Format is appName-permission where
	 *  appName can be ProposalTracker, Projects, or Map and permission can be Write, ReadOnly, or None
	 */
	appAccess: string[] = [];

	constructor(app: Apps, user?: User) {
		if (user) {
			this.email = user.profile.preferred_username ?? '';
			this.familyName = user.profile.family_name ?? '';
			this.givenName = user.profile.given_name ?? '';
			this.name = user.profile.name ?? '';
			this.phoneNumber = user.profile.phone_number ?? '';
			this.preferredUsername = user.profile.preferred_username ?? '';
			this.role = user.profile.role as Roles;
			this.guid = user.profile.sub;
			this.hasAdminAccess = user.profile.has_admin_access === 'True' ? true : false;
			this.installations = [];
			if (user.profile.installation) {
				// a single installation was coming back as just a string
				// make sure that gets turned into a single element array instead
				this.installations = Array.isArray(user.profile.installation)
					? user.profile.installation.map(i => parseInt(i))
					: [parseInt(user.profile.installation as string)];
			}
			if (user.profile.partner) {
				// a single installation was coming back as just a string
				// make sure that gets turned into a single element array instead
				this.partners = Array.isArray(user.profile.partner)
					? user.profile.partner.map(p => parseInt(p))
					: [parseInt(user.profile.partner as string)];
			}
			this.service = Number(user.profile.service_id ?? 0);
			this.isReadOnly = (user.profile.application_access as string[]).indexOf(`${app}-ReadOnly`) !== -1;
			this.accessToken = user.access_token;
			this.installationNames = (user.profile.installation_name as string[]) ?? [];
			this.appAccess = user.profile.application_access as string[];
		}
	}
	isAdmin() {
		return this.role === Roles.admin;
	}

	isHQ() {
		return this.role === Roles.hq;
	}

	isRegion1() {
		return this.role === Roles.region1;
	}

	isRegion2() {
		return this.role === Roles.region2;
	}

	isInstallation() {
		return this.role === Roles.installation;
	}

	isPartner() {
		return this.role === Roles.partner;
	}
}
