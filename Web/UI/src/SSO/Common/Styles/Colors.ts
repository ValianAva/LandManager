import { makeStyles } from '@material-ui/core/styles';

// a shared styles hook for us to add colors that the material theme won't store (e.g. warning)
export const useColors = makeStyles(theme => ({
	primary: {
		color: theme.palette.primary.main,
	},
	secondary: {
		color: theme.palette.secondary.main,
	},
	warning: {
		color: '#FFA534',
	},
	error: {
		color: theme.palette.error.main,
	},
	primaryTopBorder: {
		borderTopColor: theme.palette.primary.main,
	},
	secondaryTopBorder: {
		borderTopColor: theme.palette.secondary.main,
	},
	errorTopBorder: {
		borderTopColor: theme.palette.error.main,
	},
	warningTopBorder: {
		borderTopColor: '#FFA534',
	},
	defaultTopBorder: {
		borderTopColor: '#CCC',
	},
}));
