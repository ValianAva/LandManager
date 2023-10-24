import { red } from '@material-ui/core/colors';
import { ErrorMessage } from 'formik';
import React from 'react';

export interface IFieldArrayChildErrorMessageProps {
	name: string;
}

export const FieldArrayChildErrorMessage = (props: IFieldArrayChildErrorMessageProps) => {
	return <div style={{ color: red[500] }}> <ErrorMessage name={props.name} /></div>
};
