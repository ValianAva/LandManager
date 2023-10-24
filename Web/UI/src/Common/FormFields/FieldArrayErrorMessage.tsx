import { red } from '@material-ui/core/colors';
import { useFormikContext } from 'formik';
import React from 'react';

export interface IFieldArrayErrorMessageProps<T> {
	name: keyof T;
}

// https://formik.org/docs/api/fieldarray#fieldarray-validation-gotchas
export const FieldArrayErrorMessage = <T,>(props: IFieldArrayErrorMessageProps<T>) => {
	const context = useFormikContext<T>();
	const errors = context.errors[props.name];

	if (typeof errors === 'string') {
		return <div style={{ color: red[500] }}>{errors}</div>;
	}
	return null;
};
