import { Field } from 'formik';
import React from 'react';
import { GlobalAutocomplete } from '.';

export interface ITextAutocompleteProps {
	values: string[];
	name: string;
	/** The label/placeholder for the select element */
	label: string;
	/** For autosave, set to false for all others set to true */
	setField?: boolean;
	onChange?: (v: string) => void;
}

export const TextAutocomplete = (props: ITextAutocompleteProps) => {
	return (
		<Field
			name={props.name}
			component={(fieldProps: any) => (
				<GlobalAutocomplete<string>
					{...fieldProps}
					label={props.label || 'Statutory Justification'}
					options={props.values.sort((a, b) => ('' + a).localeCompare(b))}
					setField={props.setField}
					valueChanged={(v: string) => props.onChange && props.onChange(v)}
					multiple={false}
					getOptionId={option => option}
					getOptionLabel={(option: string) => option}
					freeSolo={true}
					multiline={true}
					autoSelect={true}
				/>
			)}
			fullWidth={true}
		/>
	);
};
