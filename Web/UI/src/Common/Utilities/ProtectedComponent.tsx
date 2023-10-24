import React from 'react';
import { Roles, Services } from 'Common/Enums';
import { useAppState } from 'Common/Context/AppProvider';
type RoleName = Roles | 'isReadOnly' | 'isAdmin';

export interface IProtectedComponentProps {
	allowedRoles?: RoleName[];
	restrictedRoles?: RoleName[];
	allowedServices?: Services[];
}

export const ProtectedComponent: React.FC<IProtectedComponentProps> = props => {
	const { CurrentUser: user } = useAppState();

	if (!user) {
		return <React.Fragment />;
	}

	const permissionsAuthorized = () => {
		if (props.allowedRoles) {
			if (props.allowedRoles.includes(user.role)) {
				return true;
			}

			if (props.allowedRoles.includes('isReadOnly')) {
				if (user.isReadOnly) {
					return true;
				}
			}

			if (props.allowedRoles.includes('isAdmin')) {
				if (user.hasAdminAccess) {
					return true;
				}
			}
		}

		if (props.restrictedRoles) {
			if (!props.restrictedRoles.includes(user.role)) {
				return true;
			}

			if (props.restrictedRoles.includes('isReadOnly')) {
				if (!user.isReadOnly) {
					return true;
				}
			}

			if (props.restrictedRoles.includes('isAdmin')) {
				if (!user.hasAdminAccess) {
					return true;
				}
			}
		}

		if (!props.allowedRoles && !props.restrictedRoles) {
			return true;
		}

		return false;
	};

	const servicesAuthorized = () => {
		// allow anyone if no services specified
		if (!props.allowedServices) {
			return true;
		}

		return props.allowedServices.includes(user.service);
	};

	return permissionsAuthorized() && servicesAuthorized() ? <>{props.children}</> : <React.Fragment />;
};
