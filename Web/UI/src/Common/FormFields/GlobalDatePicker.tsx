import React from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { getIn } from 'formik';

export const GlobalDatePicker = (props: any) => {
	const { field, form, disabled, helperText, ...other } = props;
	const { name } = field;
	const { touched, errors, isSubmitting } = form;
	const currentError = getIn(errors, name);
	const showError = getIn(touched, name) && !!currentError;
	return (
		<KeyboardDatePicker
			autoOk={true}
			disableToolbar={false}
			showTodayButton={true}
			format="MM/dd/yyyy"
			{...field}
			helperText={showError ? currentError : helperText}
			error={showError}
			disabled={disabled !== undefined ? disabled : isSubmitting}
			onChange={date => form.setFieldValue(name, date)}
			onClose={() => form.setFieldTouched(name, true)}
			autoComplete="off"
			KeyboardButtonProps={{
				'aria-label': 'change date',
			}}
			{...other}
		/>
	);
};
