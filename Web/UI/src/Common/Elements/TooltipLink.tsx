import { Tooltip } from '@material-ui/core';
import { defaultLabel } from 'labels';
import React from 'react';
import { Link } from 'react-router-dom';

export interface ITooltipLinkProps {
	label: defaultLabel;
	to: string;
}

export const TooltipLink = (props: ITooltipLinkProps) => {
	if (props.label.tooltip) {
		return (
			<Tooltip title={props.label.tooltip} placement="top">
				<Link to={props.to}>{props.label.label}</Link>
			</Tooltip>
		);
	}

	return <Link to={props.to}>{props.label.label}</Link>;
};
