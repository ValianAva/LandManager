import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

export interface IFieldsetProps {
	title: string;
}

const useStyles = makeStyles(() => ({
	root: {
		borderStyle: 'solid',
		borderRadius: 5,
		marginTop: 12,
		marginBottom: 16,
		fontSize: '1rem',
		borderwidth: 1,
	},
	legend: {
		paddingLeft: 4,
		paddingRight: 4,
		color: '#43a047',
	},
}));

export const Fieldset: React.FC<IFieldsetProps> = props => {
	const classes = useStyles();

	return (
		<fieldset className={classes.root}>
			<legend className={classes.legend}>{props.title}</legend>
			{props.children}
		</fieldset>
	);
};
