import React from 'react';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

export interface IDialogTitleProps {
	onClose?: () => void;
}

const useStyles = makeStyles(theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
}));

export const DialogTitle: React.FC<IDialogTitleProps> = props => {
	const classes = useStyles();

	return (
		<MuiDialogTitle disableTypography className={classes.root}>
			<Typography variant="h6">{props.children}</Typography>
			{props.onClose ? (
				<IconButton aria-label="close" className={classes.closeButton} onClick={props.onClose}>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
};
