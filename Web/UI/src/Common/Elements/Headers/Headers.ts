import { makeStyles } from '@material-ui/core/styles';

export interface HeaderProps {
	title: string | React.ReactNode;
	className?: string;
}

export const useHeaderStyles = makeStyles(theme => ({
	header: {
		fontWeight: 600,
		color: theme.palette.type === 'light' ? 'rgb(50, 50, 93)' : 'rgb(240, 240, 240)',
	},
}));
