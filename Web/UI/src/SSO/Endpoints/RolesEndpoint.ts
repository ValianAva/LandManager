import { Endpoint } from 'Common/Endpoints';
import { useNotifications } from 'Common/Notifications';
import { Role } from 'SSO/Models/RoleModels';

export const useRolesEndpoint = () => {
	const { useError } = useNotifications();
	const ep = Endpoint('roles');

	const GetRoles = () =>
		ep.Get<Role[]>().catch(() => {
			useError('Error getting roles');
			return [] as Role[];
		});

	return { GetRoles };
};
