import React from 'react';
import { MenuItem } from '@material-ui/core';
import { Command } from 'Common/Models/CommandModels';
import { Field } from 'formik';
import { GlobalSelect } from 'Common/FormFields';

export interface ICommandSelectProps {
	/** The array of secondary commands that will be shown as dropdown items */
	commands: Command[];
	/**
	 * The property name of the containing model which this select controls.
	 * Suggest using the nameof generic (e.g. nameof<MyModel>('myProp')).
	 */
	name: string;
	/** The label/placeholder for the select element */
	label?: string;
	/** Boolean indicating if the select should allow multiple items to be selected. Defaults to false if omitted */
	multiple?: boolean;
	onChange?: (value: number) => void;
}

export const CommandSelect = (props: ICommandSelectProps) => {
	return (
		<Field
			component={(p: any) => (
				<GlobalSelect {...p} valueChanged={(v: number) => props.onChange && props.onChange(v)} />
			)}
			name={props.name}
			select={true}
			label={props.label === undefined ? 'Command' : props.label}
			fullWidth={true}
			SelectProps={{
				multiple: props.multiple === undefined ? false : props.multiple,
			}}
		>
			<MenuItem key="command-select-none" value="0">
				- Select -
			</MenuItem>
			{props.commands
				.sort((a, b) => (a.name < b.name ? -1 : 1))
				.map(b => {
					return (
						<MenuItem key={`command-select-${b.id}`} value={b.id}>
							{b.name}
						</MenuItem>
					);
				})}
		</Field>
	);
};
