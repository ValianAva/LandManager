import { Field } from 'formik';
import React from 'react';
import { GlobalDatePicker } from '.';

export interface IDatePickerProps {
	name: string;
	label?: string;
}

export const DatePicker = (props: IDatePickerProps) => {
	return <Field component={GlobalDatePicker} name={props.name} label={props.label} />;
};
