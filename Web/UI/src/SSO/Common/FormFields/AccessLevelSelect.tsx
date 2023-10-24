import React from 'react';
import { MenuItem } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Field } from 'formik';
import { AccessLevels } from 'Common/Enums';

export interface IAccessLevelSelectProps {
	/**
	 * The property name of the containing model which this select controls.
	 * Suggest using the nameof generic (e.g. nameof<MyModel>('myProp')).
	 */
	name: string;
	/** The label/placeholder for the select element */
	label?: string;
	/** Exclude Write as an option. */
	excludeWrite?: boolean;
}

export const AccessLevelSelect = (props: IAccessLevelSelectProps) => {
	return (
		<Field
			component={TextField}
			name={props.name}
			select={true}
			label={props.label || 'Access Level'}
			fullWidth={true}
		>
			<MenuItem value={AccessLevels.None}>None</MenuItem>
			<MenuItem value={AccessLevels.ReadOnly}>Read-Only</MenuItem>
			{(props.excludeWrite === undefined || props.excludeWrite === false) && (
				<MenuItem value={AccessLevels.Write}>Write</MenuItem>
			)}
		</Field>
	);
};
