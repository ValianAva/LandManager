import { defaultLabel, multiLineLabel } from 'labels';
import React from 'react';

export const useLabel = (label?: string | string[] | defaultLabel | multiLineLabel) => {
	const makeJoinedLabel = (items: string[]) => {
		return items.map(i => (
			<>
				{i}
				<br />
			</>
		));
	};

	// this is probably more verbose than it needs to be
	// but I'd rather sacrifice some space for readability for this one
	if (!label) {
		return '';
	}

	// just return label if it's a string
	if (typeof label === 'string') {
		return label;
	}

	// just return label joined if it's a string array
	if (Array.isArray(label)) {
		return makeJoinedLabel(label);
	}

	// if we made it this far we're dealing with either of the label types
	if ('label' in label) {
		if (typeof label.label === 'string') {
			return label.label;
		}

		if (Array.isArray(label.label)) {
			return makeJoinedLabel(label.label);
		}
	}

	return '';
};
