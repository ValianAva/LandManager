import React from 'react';
import { getIn, FieldProps } from 'formik';
import MuiSelect, { SelectProps as MuiSelectProps } from '@material-ui/core/Select';
import { FormHelperText, InputLabel } from '@material-ui/core';

export interface GlobalSelectProps extends FieldProps, Omit<MuiSelectProps, 'name' | 'value'> {
	valueChanged: (v: unknown) => void;
}

/** A select component meant to be used in a Formik form, that exposes an onChange event */
export const GlobalSelect = (props: GlobalSelectProps) => {
	const { field, form, disabled, ...other } = props;
	const { valueChanged, onChange, ...propsToPass } = other;
	const { name } = field;
	const { touched, errors, isSubmitting } = form;
	const currentError = getIn(errors, name);
	const showError = getIn(touched, name) && !!currentError;
	return (
		<React.Fragment>
			<InputLabel id={field.name}>{props.label}</InputLabel>
			<MuiSelect
				{...field}
				error={showError}
				disabled={disabled !== undefined ? disabled : isSubmitting}
				fullWidth={true}
				onChange={e => {
					form.setFieldValue(name, e.target.value);
					props.valueChanged(e.target.value);
				}}
				{...propsToPass}
			/>
			<FormHelperText error={showError}>{currentError}</FormHelperText>
		</React.Fragment>
	);
};
