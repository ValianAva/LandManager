import React from 'react';
import Refresh from '@material-ui/icons/Refresh';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import classNames from 'classnames';

export interface IRefreshIconProps {
	onClick?: () => void;
	isDisabled?: boolean;
	style?: React.CSSProperties;
}

const useStyles = makeStyles(theme => ({
	actionIcon: {
		cursor: 'pointer',
	},
	icon: {
		color: green[700],
		marginRight: theme.spacing(1),
	},
	iconNotAllowed: {
		opacity: 0.4,
		cursor: 'not-allowed',
	},
}));

export const RefreshIcon = (props: IRefreshIconProps) => {
	const classes = useStyles();

	return (
		<Refresh
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
