import React from 'react';
import { RouteComponentProps, Route, Redirect } from 'react-router-dom';
import { Roles } from 'Common/Enums';
import { useAppState } from 'Common/Context/AppProvider';
type RoleName = Roles.admin | Roles.hq | Roles.installation | Roles.region1 | Roles.region2 | 'isReadOnly';

export interface IProtectedRouteProps {
	allowedRoles?: RoleName[];
	restrictedRoles?: RoleName[];
	component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
	exact?: boolean;
	path: string;
}

export const ProtectedRoute = ({
	component: ProtectedComponent,
	allowedRoles,
	restrictedRoles,
	path,
	...rest
}: IProtectedRouteProps) => {
	const state = useAppState();
	const userIsAuthorized = (): boolean => {
		if (state.CurrentUser === undefined) {
			return false;
		}

		if (restrictedRoles && restrictedRoles.includes('isReadOnly')) {
			const isReadOnlyUser = state.CurrentUser.isReadOnly;

			if (!isReadOnlyUser) {
				return true;
			}
		}

		if (allowedRoles !== undefined) {
			return (allowedRoles.filter(r => r !== 'isReadOnly') as Roles[]) // just filter out read only so we can match actual role names
				.some(r => state.CurrentUser && state.CurrentUser.role === r);
		}

		return false;
	};

	return (
		<Route
			{...rest}
			path={path}
			render={(renderProps: RouteComponentProps) =>
				userIsAuthorized() ? (
					<ProtectedComponent {...renderProps} />
				) : (
					<Redirect from={path} to="/not-authorized" />
				)
			}
		/>
	);
};
