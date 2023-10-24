import { Fab } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import React, { CSSProperties } from 'react';
type Color = 'inherit' | 'primary' | 'secondary' | 'default';
export interface IFixedFabProps {
	ariaLabel: string;
	color?: Color;
	label: string;
	icon: React.ReactNode;
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	style?: CSSProperties;
}

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			flexGrow: 1,
			bottom: 20,
			right: 20,
			position: 'fixed',
		},
	})
);
export const FixedFab = (props: IFixedFabProps) => {
	const classes = useStyles();
	return (
		<div className={classes.root} style={props.style}>
			<Fab color={props.color} aria-label={props.ariaLabel} onClick={props.onClick}>
				{props.icon} {props.label}
			</Fab>
		</div>
	);
};
