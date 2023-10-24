import React from 'react';
import List from '@material-ui/icons/List';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import classNames from 'classnames';

export interface IDetailsIconProps {
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

export const DetailsIcon = (props: IDetailsIconProps) => {
	const classes = useStyles();

	return (
		<List
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
