import React, { useEffect, useReducer } from 'react';
import { AddUser } from 'SSO/Models/UserModels';
import { UserSchemas } from 'SSO/Forms';
import { Formik, Form } from 'formik';
import { FormControl, LinearProgress, Button } from '@material-ui/core';
import { useNameof } from 'Common/Helpers/ReactHelper';
import { ServiceSelect, InstallationSelect, PartnerSelect, FormDebugging, Textbox, Checkbox } from 'Common/FormFields';
import { RoleSelect, AccessLevelSelect } from 'SSO/Common/FormFields';
import {
	useInstallationsEndpoint,
	useServicesEndpoint,
	useStatesEndpoint,
	usePartnersEndpoint,
} from 'Common/Endpoints';
import { useRolesEndpoint, useUsersEndpoint } from 'SSO/Endpoints';
import { UserReducer, UserState } from './UserReducer';

export const AddUserForm = () => {
	const nameof = useNameof<AddUser>();
	const [state, dispatch] = useReducer(UserReducer, new UserState());

	const userEp = useUsersEndpoint();
	const installationEp = useInstallationsEndpoint();
	const roleEp = useRolesEndpoint();
	const serviceEp = useServicesEndpoint();
	const stateEp = useStatesEndpoint();
	const partnerEp = usePartnersEndpoint();

	useEffect(() => {
		Promise.all([
			installationEp.GetInstallations(),
			roleEp.GetRoles(),
			serviceEp.GetServices(),
			stateEp.GetStates(),
			partnerEp.GetPartners(),
		]).then(r => {
			dispatch({
				type: 'DROPDOWNS_LOADED',
				payload: { installations: r[0], roles: r[1], services: r[2], states: r[3], partners: r[4] },
			});
		});
	}, []);

	return (
		<Formik
			initialValues={new AddUser()}
			validationSchema={UserSchemas.UserDataSchema}
			onSubmit={(values, actions) => {
				userEp
					.AddUser(values)
					.then(r => r && actions.resetForm())
					.finally(() => actions.setSubmitting(false));
			}}
		>
			{formprops => (
				<Form>
					<FormControl fullWidth={true}>
						<Textbox label="First Name" name={nameof('givenName')} />
					</FormControl>
					<FormControl fullWidth={true}>
						<Textbox label="Last Name" name={nameof('familyName')} />
					</FormControl>
					<FormControl fullWidth={true}>
						<Textbox label="Email" name={nameof('email')} type="email" />
					</FormControl>
					<FormControl fullWidth={true}>
						<RoleSelect
							roles={state.roles}
							name={nameof('roleName')}
							onChange={r => dispatch({ type: 'ROLE_CHANGED', payload: r })}
						/>
					</FormControl>
					{(state.serviceRequired || formprops.values.roleName === 'Partner') && (
						<FormControl fullWidth={true}>
							<ServiceSelect
								services={state.services}
								name={nameof('serviceId')}
								label="Service"
								onChange={() => {
									formprops.setFieldValue('selectedInstallations', []);
									formprops.setFieldValue('installationIds', []);
								}}
							/>
						</FormControl>
					)}
					{state.partnerRequired && (
						<FormControl fullWidth={true}>
							<PartnerSelect
								partners={state.partners}
								name={nameof('partnerIds')}
								multiple={true}
								onChange={v => formprops.setFieldValue('selectedPartners', v)}
							/>
						</FormControl>
					)}
					{state.installationRequired && (
						<FormControl fullWidth={true}>
							<InstallationSelect
								installations={state.installations.filter(i =>
									formprops.values.serviceId
										? i.services.map(s => s.id).includes(formprops.values.serviceId)
										: i
								)}
								name={nameof('installationIds')}
								multiple={true}
								onChange={v => formprops.setFieldValue('selectedInstallations', v)}
							/>
						</FormControl>
					)}
					{!['Installation', 'Partner'].includes(formprops.values.roleName) && (
						<FormControl>
							<Checkbox name={nameof('hasAdminAccess')} label="Has Admin Access?" />
						</FormControl>
					)}
					<FormControl fullWidth={true}>
						<AccessLevelSelect name={nameof('proposalTrackerAccess')} label="Proposal Tracker Access" />
					</FormControl>
					<FormControl fullWidth={true}>
						<AccessLevelSelect name={nameof('projectsAccess')} label="Projects Access" />
					</FormControl>
					<FormControl fullWidth={true}>
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
					<FormDebugging />
				</Form>
			)}
		</Formik>
	);
};
