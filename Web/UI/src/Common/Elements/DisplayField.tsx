import React from 'react';
import { FormControl, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	formControl: {
		marginLeft: '0',
		marginRight: '0',
		maxWidth: '100%',
		padding: `0 ${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
		width: '100%',
	},
	propertyHeader: {
		color: 'rgba(67, 160, 71, 1)',
		display: 'block',
		fontSize: '14px',
		marginBottom: theme.spacing(1),
	},
	propertyValue: {
		fontSize: '16px',
		color: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.87)' : '#ffffff',
		display: 'block',
		marginBottom: theme.spacing(3),
	},
}));

export const DisplayField = (props: { label: string; value: string }) => {
	const classes = useStyles();

	return (
		<FormControl className={classes.formControl}>
			{props.label !== '' && (
				<Typography component="span" className={classes.propertyHeader}>
					{props.label}
				</Typography>
			)}
			{props.value !== '' && (
				<Typography component="span" className={classes.propertyValue}>
					{props.value}
				</Typography>
			)}
		</FormControl>
	);
};
