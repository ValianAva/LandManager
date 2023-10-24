import { AlertClassKey } from '@material-ui/lab/Alert';

// done so we can add Mui Lab components to theme overrides
declare module '@material-ui/core/styles/overrides' {
	export interface ComponentNameToClassKey {
		MuiAlert: AlertClassKey;
	}
}
