import React from 'react';
import MuiAddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { green } from '@material-ui/core/colors';

export interface IAddIconProps {
	onClick?: () => void;
	isDisabled?: boolean;
}

const useStyles = makeStyles(theme => ({
	actionIcon: {
		cursor: 'pointer',
	},
	icon: {
		color: green[500],
		marginRight: theme.spacing(1),
	},
	iconNotAllowed: {
		opacity: 0.4,
		cursor: 'not-allowed',
	},
}));

export const AddIcon = (props: IAddIconProps) => {
	const classes = useStyles();

	return (
		<MuiAddIcon
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
