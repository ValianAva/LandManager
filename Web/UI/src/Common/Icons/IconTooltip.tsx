import { Tooltip, TooltipProps } from '@material-ui/core';
import React from 'react';

/** Wraps the tooltip children to avoid issues with directly nesting an icon in a tooltip,
 * and to avoid duplicating wrapping element styles to prevent weird layout issues (e.g. line-height increasing div height)
 * */
{
	/* Putting a span inside the tooltip stops the forwardref warning and allows
															the tooltip to show	https://github.com/mbrn/material-table/issues/677#issuecomment-572448876 */
}
export const IconTooltip: React.FC<TooltipProps> = props => {
	return (
		<Tooltip title={props.title}>
			<span style={{ lineHeight: '.5rem' }}>{props.children}</span>
		</Tooltip>
	);
};
