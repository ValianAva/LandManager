import { Endpoint } from 'Common/Endpoints';
import { useNotifications } from 'Common/Notifications';

export const useLogFilesEndpoint = () => {
	const { useError } = useNotifications();
	const ep = Endpoint('logfiles');

	const GetLogFiles = () =>
		ep.Get<string[]>().catch(() => {
			useError('Error getting log files');
			return [] as string[];
		});

	const GetLogFileContents = (name: string) =>
		ep.Get<string>(name).catch(() => {
			useError('Error getting log file contents');
			return '';
		});

	return { GetLogFiles, GetLogFileContents, IsLoading: ep.IsLoading };
};
