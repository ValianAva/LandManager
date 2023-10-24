import React from 'react';
import { usePageTitle } from 'Common/Hooks/Pages';

import { Grid } from '@material-ui/core';
import { StyledCard } from 'Common/Elements';
import { PasswordForm } from 'SSO/Forms';

export const Password = () => {
	usePageTitle('Password');

	return (
		<Grid container={true}>
			<Grid item={true} xs={12} md={6} lg={4}>
				<StyledCard title="Change Password">
					<PasswordForm />
				</StyledCard>
			</Grid>
		</Grid>
	);
};
