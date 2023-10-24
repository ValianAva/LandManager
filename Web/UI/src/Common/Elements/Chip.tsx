import React from 'react';
import { Chip as MuiChip, ChipProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export interface IChipProps extends Omit<ChipProps, 'color'> {
	color?: 'primary' | 'secondary' | 'default' | 'success' | 'warning';
}

const useStyles = makeStyles(theme => ({
	success: {
		backgroundColor: theme.palette.success.main,
	},
	warning: {
		backgroundColor: theme.palette.warning.main,
	},
}));

export const Chip = (props: IChipProps) => {
	const classes = useStyles();
	const { color, ...remainingProps } = props;

	if (color === 'success') {
		return <MuiChip {...remainingProps} className={classes.success} />;
	}

	if (color === 'warning') {
		return <MuiChip {...remainingProps} className={classes.warning} />;
	}

	return <MuiChip {...remainingProps} color={color} />;
};
