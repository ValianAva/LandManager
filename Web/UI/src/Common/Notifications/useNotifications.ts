import { useSnackbar } from 'notistack';

export const useNotifications = () => {
	const { enqueueSnackbar } = useSnackbar();

	const useSuccess = (message: string) => enqueueSnackbar(message, { variant: 'success' });
	const useError = (message: string) => enqueueSnackbar(message, { variant: 'error' });
	const useWarning = (message: string) => enqueueSnackbar(message, { variant: 'warning' });

	return { useSuccess, useError, useWarning };
};
