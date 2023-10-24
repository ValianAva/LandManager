import React from 'react';
import PencilIcon from '@material-ui/icons/Create';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

export interface IEditIconProps {
	onClick?: () => void;
	isDisabled?: boolean;
}

const useStyles = makeStyles(theme => ({
	actionIcon: {
		cursor: 'pointer',
	},
	icon: {
		color: theme.palette.warning.main,
		marginRight: theme.spacing(1),
	},
	iconNotAllowed: {
		opacity: 0.4,
		cursor: 'not-allowed',
	},
}));

export const EditIcon = (props: IEditIconProps) => {
	const classes = useStyles();

	return (
		<PencilIcon
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
