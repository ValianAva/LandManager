import { Schema, object, mixed, ref, number } from 'yup';
import { stringSchema, selectSchema, booleanSchema, arraySchema } from 'Common/ValidationSchemas/BaseSchemas';
import { IUserData, ChangePassword } from 'SSO/Models/UserModels';
import { AccessLevels, Roles } from 'Common/Enums';

export const UserDataSchema: Schema<IUserData> = object({
	givenName: stringSchema('First Name'),
	familyName: stringSchema('Last Name'),
	email: stringSchema('Email').email('Must be an email'),
	roleName: mixed<Roles>()
		.oneOf(
			[Roles.hq, Roles.installation, Roles.admin, Roles.region1, Roles.region2, Roles.reviewer, Roles.partner],
			'Role is required'
		)
		.required('Role is required'),
	serviceId: number()
		.defined()
		.when('roleName', {
			is: (roleName: Roles) => (['Region2', 'Region1', 'Installation'] as Roles[]).includes(roleName),
			then: () => selectSchema('Service', 1),
		}),
	hasAdminAccess: booleanSchema('Has Admin Access'),
	installationIds: arraySchema('Installations', 0)
		.when('roleName', {
			is: (roleName: Roles) =>
				(['HQ', 'Region2', 'Region1', 'Installation', 'Partner'] as Roles[]).includes(roleName),
			then: () => arraySchema('Installations', 1),
		})
		.defined(),
	partnerIds: arraySchema('Partners', 0)
		.when('roleName', {
			is: (roleName: Roles) => (['Partner'] as Roles[]).includes(roleName),
			then: () => arraySchema('Installations', 1),
		})
		.defined(),
	proposalTrackerAccess: mixed<AccessLevels>().required('Proposal Tracker access is required'),
	projectsAccess: mixed<AccessLevels>().required('Projects access is required'),
	isDisabled: booleanSchema('Account is disabled'),
});

export const PasswordSchema: Schema<ChangePassword> = object({
	oldPassword: stringSchema('Current Password'),
	newPassword: stringSchema('New Password'),
	confirmPassword: stringSchema('Confirm Password').oneOf([ref('newPassword')], 'Passwords must match'),
});
