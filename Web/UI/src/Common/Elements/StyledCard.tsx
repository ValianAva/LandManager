import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export interface IStyledCardProps {
	title: string;
	style?: React.CSSProperties;
}

const useStyles = makeStyles(() => ({
	card: {
		marginTop: 20,
		marginBottom: 25,
		position: 'relative',
		overflow: 'visible',
	},
	title: {
		background: 'linear-gradient(60deg, #687350, #50583e)',
		boxShadow: '0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(0, 0, 0,.4)',
		color: 'white',
		padding: 10,
		borderRadius: 5,
		position: 'relative',
		marginTop: -35,
		marginBottom: 14,
	},
}));

export const StyledCard = (props: React.PropsWithChildren<IStyledCardProps>) => {
	const classes = useStyles();

	return (
		<Card className={classes.card} style={props.style}>
			<CardContent>
				<Typography gutterBottom={true} variant="h5" component="h2" className={classes.title}>
					{props.title}
				</Typography>
				<Typography variant="body2" color="textSecondary" component="div">
					{props.children}
				</Typography>
			</CardContent>
		</Card>
	);
};
