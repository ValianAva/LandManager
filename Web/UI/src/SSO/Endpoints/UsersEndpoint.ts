import { Endpoint } from 'Common/Endpoints';
import { useNotifications } from 'Common/Notifications';
import {
	UserSummary,
	UserDetails,
	AddUser as AddUserModel,
	EditUser as EditUserModel,
	ChangePassword as ChangePasswordModel,
} from 'SSO/Models/UserModels';
import { AxiosError } from 'axios';

export const useUsersEndpoint = () => {
	const { useError, useSuccess } = useNotifications();
	const ep = Endpoint('Users');

	const GetUsers = () =>
		ep.Get<UserSummary[]>().catch(() => {
			useError('Error getting users');
			return [] as UserSummary[];
		});

	const GetUser = (id: string) =>
		ep.Get<UserDetails>(id).catch(() => {
			useError('Error getting user');
			return undefined;
		});

	const AddUser = (dto: AddUserModel) =>
		ep
			.Post<UserDetails>(dto.toDto())
			.then(r => {
				useSuccess('User added');
				return r;
			})
			.catch(() => {
				useError('Error adding user');
				return undefined;
			});

	const EditUser = (dto: EditUserModel) =>
		ep
			.Put<UserDetails>(dto.id, dto.toDto())
			.then(r => {
				useSuccess('User saved');
				return r;
			})
			.catch(() => {
				useError('Error saving user');
				return undefined;
			});

	const DeleteUser = (id: string) =>
		ep
			.Delete<string>(id)
			.then(r => {
				useSuccess('User deleted');
				return r;
			})
			.catch(() => {
				useError('Error deleting user');
				return undefined;
			});

	const ChangePassword = (dto: ChangePasswordModel) =>
		ep
			.Put<boolean>('', dto, 'password')
			.then(r => {
				useSuccess('Password changed');
				return r;
			})
			.catch((r: AxiosError) => {
				const pwErrors = (r.response?.data as any).password;

				// try giving a useful error message first
				if (Array.isArray(pwErrors)) {
					useError(pwErrors[0]);
				} else {
					useError('Error changing password');
				}
				return false;
			});

	return { GetUsers, GetUser, AddUser, EditUser, DeleteUser, ChangePassword, IsLoading: ep.IsLoading };
};
