import React from 'react';
import MuiCheckIcon from '@material-ui/icons/Check';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

export interface ICheckIconProps {
	onClick?: () => void;
	isDisabled?: boolean;
}

const useStyles = makeStyles(theme => ({
	actionIcon: {
		cursor: 'pointer',
	},
	icon: {
		color: theme.palette.primary.main,
		marginRight: theme.spacing(1),
	},
	iconNotAllowed: {
		opacity: 0.4,
		cursor: 'not-allowed',
	},
}));

export const CheckIcon = (props: ICheckIconProps) => {
	const classes = useStyles();

	return (
		<MuiCheckIcon
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
