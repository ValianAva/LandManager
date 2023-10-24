import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { WarningIcon } from 'Common/Icons';
import settings from 'settings';

export const NotAuthorized = () => {
	return (
		<Grid container={true}>
			<Grid item={true} md={4} />
			<Grid item={true} md={4}>
				<Typography gutterBottom={true} variant="h5" component="h2">
					<WarningIcon fontSize="large" /> 403 - Not Authorized
				</Typography>
				<Typography variant="body2" color="textSecondary" component="div">
					You are not authorized to view this page. If you feel this is an error, please{' '}
					<a href={`mailto:${settings.help.recipients}?subject=LandManager Website Help`}>contact the team</a>
				</Typography>
			</Grid>
		</Grid>
	);
};
