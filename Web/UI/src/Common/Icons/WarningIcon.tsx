import React from 'react';
import Warning from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

export interface IWarningIconProps {
	onClick?: () => void;
	isDisabled?: boolean;
	fontSize?: 'inherit' | 'default' | 'small' | 'large';
}

const useStyles = makeStyles(theme => ({
	actionIcon: {
		cursor: 'pointer',
		fontSize: '21px',
		marginRight: theme.spacing(1),
	},
	icon: {
		color: theme.palette.warning.main,
	},
	iconNotAllowed: {
		opacity: 0.4,
		cursor: 'not-allowed',
	},
}));

export const WarningIcon = (props: IWarningIconProps) => {
	const classes = useStyles();

	return (
		<Warning
			fontSize={props.fontSize}
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
