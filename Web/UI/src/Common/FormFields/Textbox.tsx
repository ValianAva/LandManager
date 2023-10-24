import { useLabel } from 'Common/Hooks/Labels';
import { Field, FormikConsumer } from 'formik';
import { TextField } from 'formik-material-ui';
import { defaultLabel, multiLineLabel } from 'labels';
import React from 'react';

export interface ITextboxProps {
	name: string;
	label?: string | string[] | defaultLabel | multiLineLabel;
	type?: 'text' | 'number' | 'email' | 'password';
	variant?: 'standard' | 'filled';
	minWidth?: number;
	fullWidth?: boolean;
}

export const Textbox = (props: ITextboxProps) => {
	const label = useLabel(props.label);
	// regex for testing nested props for field arrays (propName[0].nestedPropName)
	const nestedRegex = /([a-zA-Z0-9_]+)\[(\d{1,3})\]\.([a-zA-Z0-9_]+)/;
	const match = props.name.match(nestedRegex);

	// put inputProps on here since the expenditure add and edit forms rely on it for nullable cost breakout numbers
	return (
		<FormikConsumer>
			{formik => (
				<Field
					name={props.name}
					type={props.type || 'text'}
					label={label}
					component={TextField}
					inputProps={{
						value: match
							? formik.values[match[1]][match[2]][match[3]]
							: [undefined, null].includes(formik.values[props.name]) // explicitly check for undefined or null so 0 doesn't get turned into an empty string
							? ''
							: formik.values[props.name],
					}}
					variant={props.variant}
					style={{ minWidth: props.minWidth }}
					fullWidth={props.fullWidth}
				/>
			)}
		</FormikConsumer>
	);
};
