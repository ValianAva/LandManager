import React from 'react';
import { SectionFieldContent, SectionFieldHeading } from '.';
import parse from 'html-react-parser';
import { defaultLabel, multiLineLabel } from 'labels';
import { useLabel } from 'Common/Hooks/Labels';

export interface ISectionFieldProps {
	heading: string | string[] | defaultLabel | multiLineLabel;
	content: string;
	headingAction?: React.ReactNode;
	hideIfEmpty?: boolean;
}

export const SectionField = (props: ISectionFieldProps) => {
	const label = useLabel(props.heading);

	if (props.hideIfEmpty === true && props.content === '') {
		return null;
	}

	return (
		<>
			<SectionFieldHeading>{label}</SectionFieldHeading>
			{props.headingAction}
			<SectionFieldContent>{parse(props.content || '')}</SectionFieldContent>
		</>
	);
};
