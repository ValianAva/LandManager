import React from 'react';
import { useAppState } from 'Common/Context/AppProvider';
type PermissionName = 'Write' | 'ReadOnly';

export interface IAppAccessWrapperProps {
	allowedPermissions?: PermissionName[];
	appName?: 'ProposalTracker' | 'Projects';
}

export const AppAccessWrapper: React.FC<IAppAccessWrapperProps> = props => {
	const { CurrentUser } = useAppState();
	const appName = props.appName ?? '';

	const userIsAuthorized = (): boolean => {
		// deny if user is undefined
		if (!CurrentUser) {
			console.debug('user is undefined. not showing protected content');
			return false;
		}

		// begin app-specific logic
		if (props.allowedPermissions !== undefined) {
			// deny if user doesn't have a claim for the specified app
			if (!CurrentUser.appAccess.filter(a => a.includes(appName)).length) {
				console.debug(`user doesn't have ${props.appName} access claim. not showing protected content`);
				return false;
			}

			// returns the second part of the relevant access claim
			const accessLevel = CurrentUser.appAccess
				.filter(a => a.includes(appName))[0]
				.split('-')[1] as PermissionName;

			if (props.allowedPermissions.includes(accessLevel)) {
				return true;
			}
		}

		return false;
	};

	return userIsAuthorized() ? <>{props.children}</> : <></>;
};
