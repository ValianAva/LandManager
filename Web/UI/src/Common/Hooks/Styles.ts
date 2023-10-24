import { makeStyles } from '@material-ui/core/styles';

export const useReportStyles = makeStyles(() => ({
	paper: {
		overflow: 'auto',
	},
	wideColumn: {
		minWidth: '350px',
	},
	mediumColumn: {
		minWidth: '250px',
	},
	narrowColumn: {
		minWidth: '150px',
	},
}));
