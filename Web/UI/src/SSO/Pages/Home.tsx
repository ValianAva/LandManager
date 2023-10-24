import React from 'react';
import { usePageTitle } from 'Common/Hooks/Pages';
import settings from 'settings';

import { Grid, Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import { AppAccessWrapper } from 'Common/Utilities';

const AppCard = (props: { title: string; description: string; url: string }) => {
	return (
		<Card>
			<CardContent>
				<Typography gutterBottom={true} variant="h5" component="h2">
					{props.title}
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p">
					{props.description}
				</Typography>
			</CardContent>

			<CardActions>
				<Button size="small" color="primary" onClick={() => (window.location.href = props.url)}>
					Go To Application
				</Button>
			</CardActions>
		</Card>
	);
};

export const Home = () => {
	usePageTitle('Home');

	return (
		<Grid container={true}>
			<AppAccessWrapper allowedPermissions={['ReadOnly', 'Write']} appName="ProposalTracker">
				<Grid item={true} xs={12} sm={6} md={3}>
					<AppCard
						title="Proposal Tracker"
						description="The LandManager Online Proposal Tracker is the official mechanism for submitting proposals
						and other supporting documents in support of the annual proposal process.
						The Online Proposal Tracker website allows users to complete, review and submit
						annual project proposals electronically."
						url={settings.appLinks.proposals}
					/>
				</Grid>
			</AppAccessWrapper>
			<AppAccessWrapper allowedPermissions={['ReadOnly', 'Write']} appName="Projects">
				<Grid item={true} xs={12} sm={6} md={3}>
					<AppCard
						title="Projects"
						description="This Database contains information on all projects in-progress and completed. While
						most data can be accessed by all, financial details and exporting capabilities are restricted in
						accordance with the User’s access level."
						url={settings.appLinks.projects}
					/>
				</Grid>
			</AppAccessWrapper>
		</Grid>
	);
};
