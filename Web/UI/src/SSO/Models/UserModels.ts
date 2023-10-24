import { AccessLevels, Applications, Roles, Services } from 'Common/Enums';
import { Installation } from 'Common/Models/InstallationModels';
import { Partner } from 'Common/Models/PartnerModels';

export class UserSummary {
	id = '';
	name = '';
	userName = '';
	serviceName = '';
	roleName = '';
	hasAdminAccess = false;
	partners: Partner[] = [];
	installations: Installation[] = [];
	applicationAccess: AppAccessDisplay[] = [];
	lastLogin: Nullable<Date> = null;
}

export class UserDetails {
	id = '';
	givenName = '';
	familyName = '';
	userName = '';
	serviceId: Services = Services.Admin;
	roleName: Roles = Roles.null;
	hasAdminAccess = false;
	installations: Installation[] = [];
	partners: Partner[] = [];
	applicationAccess: AppAccessDisplay[] = [];
	isDisabled = false;
}

/** Data that is visible and can be modified by admin users when adding or editing users
 * Allows us to avoid adding validation for class props or methods that are not shown in a form
 */
export interface IUserData {
	givenName: string;
	familyName: string;
	email: string;
	roleName: Roles;
	serviceId: Services;
	hasAdminAccess: boolean;
	installationIds: number[];
	partnerIds: number[];
	proposalTrackerAccess: AccessLevels;
	projectsAccess: AccessLevels;
	isDisabled: boolean;
}

export class AddUser implements IUserData {
	givenName = '';
	familyName = '';
	email = '';
	roleName: Roles = Roles.null;
	serviceId: Services = Services.Admin;
	hasAdminAccess = false;
	installationIds: number[] = [];
	partnerIds: number[] = [];
	proposalTrackerAccess: AccessLevels = AccessLevels.None;
	projectsAccess: AccessLevels = AccessLevels.None;
	applicationAccess: AppAccess[] = [];
	isDisabled = false;

	/** Translates separate fields that are easy to validate and put in a form, to an array the API expects */
	toDto() {
		return {
			...this,
			applicationAccess: [
				{ applicationId: 'ProposalTracker', accessLevelId: this.proposalTrackerAccess },
				{ applicationId: 'Projects', accessLevelId: this.projectsAccess },
			],
		};
	}
}

export class EditUser implements IUserData {
	id: string;
	givenName: string;
	familyName: string;
	email: string;
	roleName: Roles;
	serviceId: Services;
	hasAdminAccess: boolean;
	installationIds: number[];
	partnerIds: number[];
	proposalTrackerAccess: AccessLevels = AccessLevels.None;
	projectsAccess: AccessLevels = AccessLevels.None;
	applicationAccess: AppAccess[] = [];
	isDisabled = false;

	constructor(details: UserDetails) {
		this.id = details.id;
		this.givenName = details.givenName;
		this.familyName = details.familyName;
		this.email = details.userName;
		this.roleName = details.roleName;
		this.serviceId = details.serviceId;
		this.hasAdminAccess = details.hasAdminAccess;
		this.installationIds = details.installations.map(i => i.id);
		this.partnerIds = details.partners.map(i => i.id);
		this.proposalTrackerAccess = mapLevelToId(
			details.applicationAccess.find(a => a.application === 'ProposalTracker')?.accessLevel
		);
		this.projectsAccess = mapLevelToId(
			details.applicationAccess.find(a => a.application === 'Projects')?.accessLevel
		);
		this.isDisabled = details.isDisabled;
	}

	/** Translates separate fields that are easy to validate and put in a form, to an array the API expects */
	toDto() {
		return {
			...this,
			applicationAccess: [
				{ applicationId: Applications.ProposalTracker, accessLevelId: this.proposalTrackerAccess },
				{ applicationId: Applications.Projects, accessLevelId: this.projectsAccess },
			],
		};
	}
}

export type AccessLevel = 'Write' | 'ReadOnly' | 'None';
export type Application = 'ProposalTracker' | 'Projects';

export class AppAccess {
	applicationId?: Applications;
	accessLevelId: AccessLevels = AccessLevels.None;
}

export class AppAccessDisplay {
	application?: Application;
	accessLevel: AccessLevel = 'None';
}

export class ChangePassword {
	oldPassword = '';
	newPassword = '';
	confirmPassword = '';
}

const mapLevelToId = (accessLevel?: AccessLevel) => {
	switch (accessLevel) {
		case 'None':
			return AccessLevels.None;
		case 'ReadOnly':
			return AccessLevels.ReadOnly;
		case 'Write':
			return AccessLevels.Write;
		default:
			return AccessLevels.None;
	}
};
