import React from 'react';
import { ChangePassword } from 'SSO/Models/UserModels';
import { useNameof } from 'Common/Helpers/ReactHelper';
import { FormControl, Button, LinearProgress } from '@material-ui/core';
import { UserSchemas } from 'SSO/Forms';
import { Formik, Form } from 'formik';
import { useUsersEndpoint } from 'SSO/Endpoints';
import { Textbox } from 'Common/FormFields';

export const PasswordForm = () => {
	const nameof = useNameof<ChangePassword>();
	const ep = useUsersEndpoint();

	return (
		<Formik
			initialValues={new ChangePassword()}
			validationSchema={UserSchemas.PasswordSchema}
			onSubmit={(values, actions) => {
				ep.ChangePassword(values)
					.then(r => r && actions.resetForm())
					.finally(() => actions.setSubmitting(false));
			}}
		>
			{formprops => (
				<Form>
					<FormControl fullWidth={true}>
						<Textbox type="password" label="Current Password" name={nameof('oldPassword')} />
					</FormControl>
					<FormControl fullWidth={true}>
						<Textbox type="password" label="New Password" name={nameof('newPassword')} />
					</FormControl>
					<FormControl fullWidth={true}>
						<Textbox type="password" label="Confirm Password" name={nameof('confirmPassword')} />
					</FormControl>
					<FormControl>
						{formprops.isSubmitting && <LinearProgress />}
						<Button
							type="submit"
							color="primary"
							variant="contained"
							disabled={formprops.isSubmitting}
							onSubmit={formprops.submitForm}
						>
							{formprops.isSubmitting ? 'Saving...' : 'Submit'}
						</Button>
					</FormControl>
				</Form>
			)}
		</Formik>
	);
};
