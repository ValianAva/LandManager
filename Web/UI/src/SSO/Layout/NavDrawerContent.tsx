import React from 'react';

import { List, Divider } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/HomeRounded';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircleRounded';
import SettingsIcon from '@material-ui/icons/Settings';
import LockIcon from '@material-ui/icons/Lock';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import { ProtectedComponent } from 'Common/Utilities';
import settings from 'settings';
import { useAppState } from 'Common/Context/AppProvider';
import { NavLink, SkeletonBar } from 'Common/Elements';

export const NavDrawerContent = () => {
	const { LoginStatus } = useAppState();

	if (LoginStatus !== 'Logged In') {
		return (
			<>
				<SkeletonBar />
				<SkeletonBar />
				<SkeletonBar />
			</>
		);
	}

	return (
		<React.Fragment>
			<div style={{ flexGrow: 1 }}>
				<List disablePadding={false}>
					<NavLink to="/" text="Home" icon={<HomeIcon />} />
				</List>

				<Divider />

				<List>
					<NavLink to="/profile" text="Profile" icon={<SettingsIcon />} />
					<NavLink to="/password" text="Change Password" icon={<LockIcon />} />
				</List>

				<Divider />
				<ProtectedComponent allowedRoles={['isAdmin']}>
					<List>
						<NavLink to="/users" text="User Management" icon={<SupervisedUserCircle />} />
					</List>

					<Divider />
				</ProtectedComponent>
			</div>
			<List>
				<NavLink
					to={`mailto:${settings.help.recipients}?subject=${settings.siteName} Help`}
					text="Contact Help Staff"
					icon={<HelpOutlineOutlinedIcon />}
				/>
			</List>
		</React.Fragment>
	);
};
