import { Field } from 'formik';
import { CheckboxWithLabel } from 'formik-material-ui';
import React from 'react';

export interface ICheckboxProps {
	name: string;
	label: string;
}

export const Checkbox = (props: ICheckboxProps) => {
	return <Field component={CheckboxWithLabel} name={props.name} type="checkbox" Label={{ label: props.label }} />;
};
