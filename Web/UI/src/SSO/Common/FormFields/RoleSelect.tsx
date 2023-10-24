import React from 'react';
import { MenuItem } from '@material-ui/core';
import { Field } from 'formik';
import { Role } from 'SSO/Models/RoleModels';
import { Roles } from 'Common/Enums';
import { GlobalSelect } from 'Common/FormFields';

export interface IRoleSelectProps {
	/** The array of roles that will be shown as dropdown items */
	roles: Readonly<Role[]>;
	/**
	 * The property name of the containing model which this select controls.
	 * Suggest using the nameof generic (e.g. nameof<MyModel>('myProp')).
	 */
	name: string;
	/** The label/placeholder for the select element */
	label?: string;
	multiple?: boolean;
	onChange?: (value: Roles) => void;
}

export const RoleSelect = (props: IRoleSelectProps) => {
	return (
		<Field
			component={(p: any) => (
				<GlobalSelect {...p} valueChanged={(v: Roles) => props.onChange && props.onChange(v)} />
			)}
			name={props.name}
			select={true}
			label={props.label || 'Roles'}
			fullWidth={true}
			SelectProps={{
				multiple: props.multiple === undefined ? false : props.multiple,
			}}
		>
			<MenuItem value="">- Select -</MenuItem>
			{props.roles.map(i => {
				return (
					<MenuItem key={`role-select-${i.id}`} value={i.name}>
						{i.name}
					</MenuItem>
				);
			})}
		</Field>
	);
};
