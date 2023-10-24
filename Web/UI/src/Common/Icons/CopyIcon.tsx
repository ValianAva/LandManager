import React from 'react';
import Copy from '@material-ui/icons/FileCopy';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import classNames from 'classnames';

export interface ICopyIconProps {
	onClick?: () => void;
	isDisabled?: boolean;
	style?: React.CSSProperties;
}

const useStyles = makeStyles(theme => ({
	actionIcon: {
		cursor: 'pointer',
	},
	icon: {
		color: blue[500],
		marginRight: theme.spacing(1),
	},
	iconNotAllowed: {
		opacity: 0.4,
		cursor: 'not-allowed',
	},
}));

export const CopyIcon = (props: ICopyIconProps) => {
	const classes = useStyles();

	return (
		<Copy
			className={classNames(
				classes.icon,
				{ [classes.iconNotAllowed]: props.isDisabled },
				{ [classes.actionIcon]: props.onClick !== undefined }
			)}
			style={props.style}
			onClick={() => {
				if (props.isDisabled !== true && props.onClick) {
					props.onClick();
				}
			}}
		/>
	);
};
