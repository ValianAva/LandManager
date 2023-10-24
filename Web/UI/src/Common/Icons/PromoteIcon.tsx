import React from 'react';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	rotateUp: {
		transform: 'rotate(-90deg)',
	},
}));

export const PromoteIcon = () => {
	const classes = useStyles();

	return <DoubleArrowIcon className={classes.rotateUp} />;
};
