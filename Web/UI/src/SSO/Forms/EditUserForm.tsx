import React, { useEffect, useReducer, useState } from 'react';
import { EditUser, UserDetails } from 'SSO/Models/UserModels';
import { UserSchemas } from 'SSO/Forms';
import { Formik, Field, Form } from 'formik';
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

export interface IEditUserFormProps {
	userId: string;
}

export const EditUserForm = (props: IEditUserFormProps) => {
	const nameof = useNameof<EditUser>();
	const [state, dispatch] = useReducer(UserReducer, new UserState());
	const [userToEdit, setUserToEdit] = useState<UserDetails>();

	const userEp = useUsersEndpoint();
	const installationEp = useInstallationsEndpoint();
	const roleEp = useRolesEndpoint();
	const serviceEp = useServicesEndpoint();
	const stateEp = useStatesEndpoint();
	const partnerEp = usePartnersEndpoint();

	useEffect(() => {
		userEp.GetUser(props.userId).then(r => r && handleLoad(r));

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

	const handleLoad = (user: UserDetails) => {
		dispatch({ type: 'USER_LOADED', payload: user });
		setUserToEdit(user);
	};

	if (userToEdit === undefined) {
		return <LinearProgress />;
	}

	return (
		<Formik
			initialValues={new EditUser(userToEdit)}
			validationSchema={UserSchemas.UserDataSchema}
			onSubmit={(values, actions) => {
				userEp.EditUser(values).finally(() => actions.setSubmitting(false));
			}}
		>
			{formprops => (
				<Form>
					<Field name={nameof('id')} type="hidden" />

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

					<FormControl>
						<Checkbox name={nameof('isDisabled')} label="Account is disabled?" />
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
							{formprops.isSubmitting ? 'Saving...' : 'Save'}
						</Button>
					</FormControl>
					<FormDebugging />
				</Form>
			)}
		</Formik>
	);
};
