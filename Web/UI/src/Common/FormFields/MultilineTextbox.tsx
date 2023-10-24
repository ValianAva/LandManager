import { SectionFieldHeading } from 'Common/Elements/Sections';
import { useLabel } from 'Common/Hooks/Labels';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { defaultLabel, multiLineLabel } from 'labels';
import React from 'react';

export interface IMultilineTextboxProps {
	name: string;
	label?: string | string[] | defaultLabel | multiLineLabel;
	variant?: 'filled' | 'outlined';
}

export const MultilineTextbox = (props: IMultilineTextboxProps) => {
	const label = useLabel(props.label);

	return (
		<>
			{props.label && <SectionFieldHeading>{label}</SectionFieldHeading>}
			<Field
				name={props.name}
				type="text"
				component={TextField}
				multiline={true}
				minRows={4}
				maxRows={10}
				variant={props.variant}
			/>
		</>
	);
};
