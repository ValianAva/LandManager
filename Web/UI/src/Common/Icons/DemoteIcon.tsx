import React from 'react';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	rotateDown: {
		transform: 'rotate(90deg)',
	},
}));

export const DemoteIcon = () => {
	const classes = useStyles();

	return <DoubleArrowIcon className={classes.rotateDown} />;
};
