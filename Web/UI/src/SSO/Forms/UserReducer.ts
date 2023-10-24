import { createAction, ActionType } from 'typesafe-actions';
import { Role } from 'SSO/Models/RoleModels';
import { Roles } from 'Common/Enums';
import { Service } from 'Common/Models/ServiceModels';
import { Installation } from 'Common/Models/InstallationModels';
import { State } from 'Common/Models/StateModels';
import { UserDetails } from 'SSO/Models/UserModels';
import { Partner } from 'Common/Models/PartnerModels';

interface Dropdowns {
	roles: Role[];
	services: Service[];
	installations: Installation[];
	states: State[];
	partners: Partner[];
}

// actions
const Actions = {
	UserLoaded: createAction('USER_LOADED')<UserDetails>(),
	DropdownsLoaded: createAction('DROPDOWNS_LOADED')<Dropdowns>(),
	RoleChanged: createAction('ROLE_CHANGED')<Roles>(),
};

const rolesRequiringService: Roles[] = [Roles.hq, Roles.region2, Roles.region1, Roles.installation];
const rolesRequiringInstallation: Roles[] = [Roles.region2, Roles.region1, Roles.installation, Roles.partner];
const rolesRequiringPartner: Roles[] = [Roles.partner];

export class UserState implements Dropdowns {
	isLoading = true;
	roles: Role[] = [];
	services: Service[] = [];
	installations: Installation[] = [];
	states: State[] = [];
	partners: Partner[] = [];
	serviceRequired = false;
	installationRequired = false;
	partnerRequired = false;
}

export const UserReducer = (state: UserState, action: ActionType<typeof Actions>): UserState => {
	switch (action.type) {
		case 'DROPDOWNS_LOADED':
			return { ...state, ...action.payload, isLoading: false };

		case 'USER_LOADED':
			return {
				...state,
				serviceRequired: rolesRequiringService.includes(action.payload.roleName),
				installationRequired: rolesRequiringInstallation.includes(action.payload.roleName),
				partnerRequired: rolesRequiringPartner.includes(action.payload.roleName),
			};

		case 'ROLE_CHANGED':
			return {
				...state,
				serviceRequired: rolesRequiringService.includes(action.payload),
				installationRequired: rolesRequiringInstallation.includes(action.payload),
				partnerRequired: rolesRequiringPartner.includes(action.payload),
			};

		default:
			return state;
	}
};
