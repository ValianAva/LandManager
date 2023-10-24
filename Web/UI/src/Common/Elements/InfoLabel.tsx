import { Tooltip } from '@material-ui/core';
import { defaultLabel } from 'labels';
import React from 'react';
import { InfoIcon } from 'Common/Icons';

export interface IInfoLabelProps {
	label: defaultLabel;
}

export const InfoLabel = (props: IInfoLabelProps) => {
	if (props.label.tooltip) {
		return (
			<Tooltip title={props.label.tooltip as string}>
				<span>
					{props.label.label}
					<InfoIcon style={{ marginBottom: -3 }} />
				</span>
			</Tooltip>
		);
	}

	return <>{props.label.label}</>;
};
