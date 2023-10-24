import { makeStyles } from '@material-ui/core/styles';

export const useHeaderButtonStyles = makeStyles(theme => ({
	leftButton: {
		borderRight: `1px solid ${theme.palette.primary.light}`,
	},
	centerButton: {
		marginLeft: '5px',
		marginRight: '5px',
		borderRight: `1px solid ${theme.palette.primary.light}`,
		borderLeft: `1px solid ${theme.palette.primary.light}`,
	},
	rightButton: {
		borderLeft: `1px solid ${theme.palette.primary.light}`,
	},
}));
