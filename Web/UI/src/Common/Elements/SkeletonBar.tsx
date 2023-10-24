import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	navSkeleton: {
		backgroundColor: 'rgba(255,255,255,.2)',
		marginRight: 8,
		marginLeft: 8,
	},
}));

export const SkeletonBar = () => {
	const classes = useStyles();
	return (
		<Typography variant="h3">
			<Skeleton animation="wave" className={classes.navSkeleton} />
		</Typography>
	);
};
