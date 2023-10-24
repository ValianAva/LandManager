import React from 'react';
import SaveChangesIcon from '@material-ui/icons/Save';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { blue } from '@material-ui/core/colors';
export interface ISaveIconProps {
	onClick?: () => void;
	isDisabled?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
	actionIcon: {
		cursor: 'pointer',
		fontSize: '21px',
		marginRight: theme.spacing(1),
	},
	icon: {
		color: blue[500],
	},
	iconNotAllowed: {
		opacity: 0.4,
		cursor: 'not-allowed',
	},
}));

export const SaveIcon = (props: ISaveIconProps) => {
	const classes = useStyles();

	return (
		<SaveChangesIcon
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
