import React from 'react';
import { Box } from '@material-ui/core';

export interface ITabPanelProps {
	index: number;
	value: number;
}

export const TabPanel: React.FC<ITabPanelProps> = props => {
	return (
		<div role="tabpanel" hidden={props.value !== props.index}>
			{props.value === props.index && <Box p={0}>{props.children}</Box>}
		</div>
	);
};
