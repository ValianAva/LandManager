import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
	return (
		<>
			<Typography variant="h6" component="h6">
				Save Progress
			</Typography>
			<Box display="flex" alignItems="center">
				<Box width="100%" mr={1}>
					<LinearProgress variant="determinate" {...props} />
				</Box>
				<Box minWidth={35}>
					<Typography variant="body2" color="textSecondary">{`${Math.round(props.value)}%`}</Typography>
				</Box>
			</Box>
		</>
	);
}

const useStyles = makeStyles({
	root: {
		width: '100%',
	},
});

export const LinearWithValueLabel = (percent: { value: number; filesCount: number; progressCount: number }) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<LinearProgressWithLabel value={percent.value > 100 ? 0 : Math.round(percent.value / 10) * 10} />
			<Typography variant="caption">{`${percent.progressCount} of ${percent.filesCount} files saved`}</Typography>
		</div>
	);
};
