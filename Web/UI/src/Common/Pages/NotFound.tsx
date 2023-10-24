import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { WarningIcon } from 'Common/Icons';

export const NotFound = () => {
	return (
		<Grid container={true}>
			<Grid item={true} md={4} />
			<Grid item={true} md={4}>
				<Typography gutterBottom={true} variant="h5" component="h2">
					<WarningIcon fontSize="large" /> 404 - Page Not Found
				</Typography>
				<Typography variant="body2" color="textSecondary" component="div">
					The requested page was not found. If you came here via a bookmark, it may indicate your bookmark is
					out of date.
				</Typography>
			</Grid>
		</Grid>
	);
};
