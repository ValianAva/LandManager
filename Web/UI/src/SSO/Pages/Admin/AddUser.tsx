import React from 'react';
import { usePageTitle } from 'Common/Hooks/Pages';

import { Grid } from '@material-ui/core';
import { StyledCard } from 'Common/Elements';
import { AddUserForm } from 'SSO/Forms';

export const AddUser = () => {
	usePageTitle('Add User');

	return (
		<Grid container={true}>
			<Grid item={true} xs={12} md={6} lg={4}>
				<StyledCard title="Add User">
					<AddUserForm />
				</StyledCard>
			</Grid>
		</Grid>
	);
};
