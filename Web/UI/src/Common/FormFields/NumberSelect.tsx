import React from 'react';
import { MenuItem } from '@material-ui/core';
import { Field } from 'formik';
import { GlobalSelect } from 'Common/FormFields';

export interface INumberSelectProps {
	/** The array of numbers that will be shown as dropdown items */
	numbers: number[];
	/**
	 * The property name of the containing model which this select controls.
	 * Suggest using the nameof generic (e.g. nameof<MyModel>('myProp')).
	 */
	name: string;
	/** The label/placeholder for the select element */
	label?: string;
	/** Boolean indicating if the select should allow multiple items to be selected. Defaults to false if omitted */
	multiple?: boolean;
	onChange?: (value: number) => void;
}

export const NumberSelect = (props: INumberSelectProps) => {
	return (
		<Field
			component={(p: any) => (
				<GlobalSelect {...p} valueChanged={(v: number) => props.onChange && props.onChange(v)} />
			)}
			name={props.name}
			required={true}
			select={true}
			label={props.label || ''}
			fullWidth={true}
			SelectProps={{
				multiple: props.multiple === undefined ? false : props.multiple,
			}}
		>
			<MenuItem key="number-select-none" value="0">
				- Select -
			</MenuItem>
			{props.numbers.sort().map((n, idx) => {
				return (
					<MenuItem key={`number-select-${n}-${idx}`} value={n}>
						{n}
					</MenuItem>
				);
			})}
		</Field>
	);
};
