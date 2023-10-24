import { FormControl } from '@material-ui/core';
import { SectionFieldHeading } from 'Common/Elements/Sections';
import { Field } from 'formik';
import React from 'react';
import { RichTextEditor } from '.';

export interface ILabelledRichTextEditorProps {
	name: string;
	label: string;
	limit?: number;
	height?: number;
	disabled?: boolean;
}

export const LabelledRichTextEditor = (props: ILabelledRichTextEditorProps) => {
	return (
		<>
			<SectionFieldHeading>{props.label}</SectionFieldHeading>
			<FormControl fullWidth={true}>
				<Field
					name={props.name}
					type="text"
					component={RichTextEditor}
					height={props.height}
					disabled={props.disabled}
					limit={props.limit}
				/>
			</FormControl>
		</>
	);
};
