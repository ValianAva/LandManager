import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useAppStyles = makeStyles((theme: Theme) => ({
	root: {
		display: 'flex',
		height: '100%',
	},
	appBarSpacer: {
		minHeight: 69,
	},
	content: {
		flexGrow: 1,
		height: '100%',
		overflow: 'auto',
		padding: theme.spacing(3),
	},
}));
