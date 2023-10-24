import React from 'react';
import { usePageTitle } from 'Common/Hooks/Pages';

import { Grid } from '@material-ui/core';
import { StyledCard } from 'Common/Elements';
import { EditUserForm } from 'SSO/Forms';
import { RouteComponentProps } from 'react-router-dom';

export const EditUser = (props: RouteComponentProps<any>) => {
	usePageTitle('Edit User');

	return (
		<Grid container={true}>
			<Grid item={true} xs={12} md={6} lg={4}>
				<StyledCard title="Edit User">
					<EditUserForm userId={props.match.params.id} />
				</StyledCard>
			</Grid>
		</Grid>
	);
};
