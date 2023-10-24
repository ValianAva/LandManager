import { Endpoint } from 'Common/Endpoints';
import { useNotifications } from 'Common/Notifications';
import { Command } from 'Common/Models/CommandModels';
import settings from 'settings';
import { ServiceIds } from 'Common/Models/ServiceModels';

export const useCommandsEndpoint = () => {
	const { useError } = useNotifications();
	const ep = Endpoint('Commands', settings.httpClient.ssoBaseUrl);

	const GetCommands = (serviceId: Nullable<ServiceIds> = null) =>
		ep.Get<Command[]>().catch(() => {
			useError('Error getting commands');
			return [] as Command[];
		});

	return { GetCommands, IsLoading: ep.IsLoading };
};
