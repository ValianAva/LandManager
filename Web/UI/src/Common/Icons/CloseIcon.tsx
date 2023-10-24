import React from 'react';
import Close from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

export interface ICloseIconProps {
	onClick?: () => void;
	isDisabled?: boolean;
}

const useStyles = makeStyles(theme => ({
	actionIcon: {
		cursor: 'pointer',
	},
	icon: {
		color: theme.palette.error.main,
		marginRight: theme.spacing(1),
	},
	iconNotAllowed: {
		opacity: 0.4,
		cursor: 'not-allowed',
	},
}));

export const CloseIcon = (props: ICloseIconProps) => {
	const classes = useStyles();

	return (
		<Close
			className={classNames(
				classes.icon,
				{ [classes.iconNotAllowed]: props.isDisabled },
				{ [classes.actionIcon]: props.onClick !== undefined }
			)}
			onClick={() => {
				if (props.isDisabled !== true && props.onClick) {
					props.onClick();
				}
			}}
		/>
	);
};
