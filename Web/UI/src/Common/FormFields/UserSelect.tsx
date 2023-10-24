import React from 'react';
import { MenuItem } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Field } from 'formik';
import { User } from 'Common/Models/UserModels';

export interface IUserSelectProps {
	/** The array of users that will be shown as dropdown items */
	users: User[];
	/**
	 * The property name of the containing model which this select controls.
	 * Suggest using the nameof generic (e.g. nameof<MyModel>('myProp')).
	 */
	name: string;
	/** The label/placeholder for the select element */
	label?: string;
	/** Boolean indicating if the select should allow multiple items to be selected. Defaults to false if omitted */
	multiple?: boolean;
}

export const UserSelect = (props: IUserSelectProps) => {
	return (
		<Field
			component={TextField}
			name={props.name}
			select={true}
			label={props.label === undefined ? 'User' : props.label}
			fullWidth={true}
			SelectProps={{
				multiple: props.multiple === undefined ? false : props.multiple,
			}}
		>
			<MenuItem key="user-select-none" value="0">
				- Select -
			</MenuItem>
			{props.users
				.sort((a, b) => (a.name < b.name ? -1 : 1))
				.map(i => {
					return (
						<MenuItem key={`user-select-${i.id}`} value={i.userName}>
							{i.userName}
						</MenuItem>
					);
				})}
		</Field>
	);
};
