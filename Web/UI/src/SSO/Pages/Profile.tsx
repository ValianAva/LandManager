import React from 'react';
import { usePageTitle } from 'Common/Hooks/Pages';

import {
	Grid,
	LinearProgress,
	TableRow,
	Table,
	TableCell,
	TableBody,
	List,
	ListItem,
	ListItemText,
} from '@material-ui/core';
import { useAppState } from 'Common/Context/AppProvider';
import { StyledCard } from 'Common/Elements';

export const Profile = () => {
	const { CurrentUser } = useAppState();

	usePageTitle('Profile');

	if (!CurrentUser) {
		return <LinearProgress />;
	}

	return (
		<Grid container={true}>
			<Grid item={true} xs={12} md={6} lg={4}>
				<StyledCard title="Profile">
					<Table>
						<TableBody>
							<TableRow>
								<TableCell variant="head">Name</TableCell>
								<TableCell>{CurrentUser.name}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell variant="head">Email</TableCell>
								<TableCell>{CurrentUser.preferredUsername}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell variant="head">Role</TableCell>
								<TableCell>{CurrentUser.role}</TableCell>
							</TableRow>
							{!CurrentUser.isAdmin() && (
								<React.Fragment>
									<TableRow>
										<TableCell variant="head">Service</TableCell>
										<TableCell>{CurrentUser.service}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell variant="head">Installations</TableCell>
										<TableCell>
											<List dense={true}>
												{Array.isArray(CurrentUser.installationNames) &&
													CurrentUser.installationNames.map(i => {
														return (
															<ListItem key={i}>
																<ListItemText primary={i} />
															</ListItem>
														);
													})}
											</List>
										</TableCell>
									</TableRow>
								</React.Fragment>
							)}
							<TableRow>
								<TableCell variant="head">Has Admin Access?</TableCell>
								<TableCell>{CurrentUser.hasAdminAccess ? 'Yes' : 'No'}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell variant="head">Application Access</TableCell>
								<TableCell>
									<List dense={true}>
										{CurrentUser.appAccess.map(a => {
											return (
												<ListItem key={a}>
													<ListItemText primary={a} />
												</ListItem>
											);
										})}
									</List>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</StyledCard>
			</Grid>
		</Grid>
	);
};
