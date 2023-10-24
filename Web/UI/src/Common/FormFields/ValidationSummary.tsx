import { FormikConsumer, FormikErrors, FormikTouched, useFormikContext } from 'formik';
import React from 'react';
import { Alert } from '@material-ui/lab';
import labels, { Labels, defaultLabel } from 'labels';

export interface IValidationSummaryProps {
	labelsSection?: keyof Labels;
	additionalText?: string;
}

export const ValidationSummary = (props: IValidationSummaryProps) => {
	const context = useFormikContext();

	// I know using any isn't good but I'm calling uncle
	// It seems setting the type of the messages var causes us to chase our tail
	// (i.e. the main function will always be 'one level deeper' for the arrays and never be satisfied)
	const showErrors: any = (errors: FormikErrors<any>, touched: FormikTouched<any>) => {
		if (errors === undefined || errors === null) {
			return null;
		}

		var keys = Object.keys(errors);

		if (!keys.length) {
			return null;
		}

		return (
			<ul>
				{keys.map(k => {
					var error = errors[k];
					// before updating yup to v1.x, we beleive the whole touched object was populated
					// after the update, it only populates fields that have been touched
					// easiest solution is to just hide the summary until the form's submitted
					// to avoid a harassing validation summary with no associated message next to a field
					var fieldTouched = touched[k];

					if (!error || !fieldTouched) {
						return null;
					}

					if (Array.isArray(error)) {
						var title = formatError(k, '');
						var messages = error.map((e, i) =>
							typeof e === 'string'
								? formatError(k, e)
								: showErrors(e, Array.isArray(fieldTouched) ? fieldTouched[i] : fieldTouched)
						);
						return [title, ...messages];
					} else {
						return formatError(k, error);
					}
				})}
			</ul>
		);
	};

	const formatError = (name: string, value: string | FormikErrors<any>) => {
		// if the labelSection prop has been supplied and we can find a matching label by field name, then use it
		// otherwise just show the field name
		const section = props.labelsSection ? labels[props.labelsSection] : undefined;
		if (!section) {
			return <li>{`${name}: ${value}`}</li>;
		}

		let label: string | string[] = name;
		const labelMatch = Object.entries(section).find(([key, value]) => key === name);
		if (labelMatch) {
			label = (labelMatch[1] as defaultLabel).label;
		}

		return <li>{`${label}: ${value}`}</li>;
	};

	// just don't show the validation summary until they try to submit
	// avoids any issues with array fields not showing child errors since the child fields haven't been touched
	if (context.submitCount < 1) {
		return null;
	}

	return (
		<FormikConsumer>
			{formik => {
				var errors = formik.errors;
				var touched = formik.touched;
				if (errors === null || Object.keys(errors).length === 0 || touched === null) {
					return null;
				}

				if (!Object.keys(errors).some(e => Object.keys(touched).includes(e))) {
					return null;
				}
				return (
					<Alert severity="error">
						{showErrors(errors, touched)}
						<p>{props.additionalText}</p>
					</Alert>
				);
			}}
		</FormikConsumer>
	);
};
