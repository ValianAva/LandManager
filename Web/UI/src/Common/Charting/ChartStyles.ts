import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useChartStyles = makeStyles<Theme>(theme => ({
	tooltip: {
		backgroundColor: theme.palette.background.paper,
		border: '1px solid #ccc',
		borderColor: theme.palette.divider,
		padding: 8,
		zIndex: 10,
	},
	tooltipItemList: {
		listStyleType: 'none',
		margin: 0,
		paddingLeft: 0,
	},
	tooltipItem: {
		fontWeight: 400,
		marginTop: theme.spacing(0.5),
	},
	tooltipItemLabel: {
		color: theme.palette.text.primary,
		fontWeight: 600,
	},
}));
