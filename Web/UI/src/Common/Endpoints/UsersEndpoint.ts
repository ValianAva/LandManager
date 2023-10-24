import { Endpoint } from 'Common/Endpoints';
import { useNotifications } from 'Common/Notifications';
import { User } from 'Common/Models/UserModels';
import settings from 'settings';

export const useUsersEndpoint = () => {
	const { useError } = useNotifications();
	const ep = Endpoint('users', settings.httpClient.ssoBaseUrl);

	const GetUsers = () =>
		ep.Get<User[]>().catch(() => {
			useError('Error getting users');
			return [] as User[];
		});

	return { GetUsers, IsLoading: ep.IsLoading };
};
