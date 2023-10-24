import React from 'react';

import { Box, Grid, Typography } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';

interface IPageHeaderProps {
	text: string;
	component?: React.ElementType;
	variant?: Variant;
}

export const PageHeader: React.FC<IPageHeaderProps> = props => {
	const component = props.component && props.component ? props.component : 'h1';
	const variant = props.variant && props.variant ? props.variant : 'h4';
	return (
		<Grid container={true}>
			<Grid item={true} md={true}>
				<Typography component={component} variant={variant}>
					{props.text}
				</Typography>
			</Grid>
			<Grid item={true} md={true}>
				<Box display="flex" justifyContent="flex-end">
					<Box>{props.children}</Box>
				</Box>
			</Grid>
		</Grid>
	);
};
