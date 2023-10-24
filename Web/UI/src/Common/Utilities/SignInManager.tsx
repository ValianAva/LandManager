import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppState } from 'Common/Context/AppProvider';
import { HistoryTracker } from '.';
import settings from 'settings';
import { AuthHelper } from 'Common/Helpers';
import { User, UserManager, UserManagerSettings, Log } from 'oidc-client-ts';
import axios from 'axios';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	LinearProgress,
} from '@material-ui/core';
import { StyledCard } from 'Common/Elements';
import { Apps } from 'Common/Models/AppModels';

interface ISignInManagerProps {
	app: Apps;
}

export const SignInManager: React.FC<ISignInManagerProps> = props => {
	const state = useAppState();
	const dispatch = useAppDispatch();
	const [lastActivity, setLastActivity] = useState(new Date());
	const [isAuthorized, setIsAuthorized] = useState(true);
	const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);
	const [userManager, setUserManager] = useState<UserManager>();

	const setBearerToken = (user: User) => {
		axios.defaults.headers.common.Authorization = `Bearer ${user.access_token}`;
	};

	const closeModal = () => {
		setIsLogOutModalOpen(false);
	};

	const handleStaySignedInClick = () => {
		closeModal();
		setLastActivity(new Date());
	};

	const logOut = (mgr: UserManager) => {
		mgr.revokeTokens();
		mgr.removeUser();
		mgr.signoutRedirect();
	};

	const redirectUris = () => {
		// avoid having double slashes in redirect URIs for SSO
		// not the shortest code for that but it's easily understood
		// doing it in code since running locally and dev share the same config
		// but we can only have one value in the config table for redirects (e.g. running on dev tries to redirect to localhost)
		let baseUrl = `https://${window.location.host}/${settings.pathBase}`;
		if (settings.pathBase !== '') {
			baseUrl += '/';
		}

		return {
			redirect_uri: `${baseUrl}login-callback.html`,
			silent_redirect_uri: `${baseUrl}silent-renew.html`,
		};
	};

	useEffect(() => {
		if (settings.oidc.debug) {
			Log.setLogger(console);
			Log.setLevel(Log.DEBUG);
		}

		const userManagerSettings: UserManagerSettings = {
			...settings.oidc,
			...redirectUris(),
			accessTokenExpiringNotificationTimeInSeconds: 90,
			monitorSession: true, // the key to getting the checkSession iframe to actually put itself in the page
		};

		// moved here to prevent excessive iframes from being added to the DOM
		const mgr = new UserManager(userManagerSettings);

		mgr.events.addUserLoaded(u => {
			setBearerToken(u);
		});

		// set last activity to prevent subsequent site loads from immediately signing the user out
		setLastActivity(new Date());

		mgr.getUser()
			.then(user => {
				if (user && !user.expired) {
					var appAccess = user.profile.application_access as string[];
					// show not authorized if user doesn't have an app access claim, or it's [LandManager]-none
					if (
						(!appAccess.filter((a: string) => a.includes(props.app)).length ||
							appAccess.includes(`${props.app}-None`)) &&
						props.app !== 'SSO' // allow anyone to get to the SSO app
					) {
						setIsAuthorized(false);
					}

					setBearerToken(user);
					dispatch({ type: 'APP/USER_LOGGED_IN', payload: { app: props.app, user } });

					mgr.events.addAccessTokenExpired(() => {
						logOut(mgr);
						dispatch({ type: 'APP/USER_LOGGED_OUT' });
					});

					mgr.events.addUserSignedOut(() => {
						logOut(mgr);
						dispatch({ type: 'APP/USER_LOGGED_OUT' });
					});

					return;
				} else {
					return mgr.signinRedirect({ state: window.location.href });
				}
			})
			.catch(error => {
				console.error(error);
			});

		['click', 'keyup'].forEach(evt =>
			document.getElementById('app')!.addEventListener(evt, function () {
				setLastActivity(new Date());
			})
		);

		setUserManager(mgr);
	}, []);

	useEffect(() => {
		const userManagerSettings: UserManagerSettings = {
			...settings.oidc,
			...redirectUris(),
			accessTokenExpiringNotificationTimeInSeconds: 90,
		};

		const userManager = new UserManager(userManagerSettings);

		/*  Decided to abandon conditionally renewing access tokens and basing 'active' off of that.
			oidc-client timers would reset properly if signInSilent was called inside the token
			expiring event handler but would leave old 'token expired' timers around if
			signInSilent was called as a result of clicking the button in the log out warning modal.
			
			There would be a new token expired timer but users got logged out from the old expired timer.
			No amount of calling events.unload() or adding and removing token expiration
			event handlers got it going.

			This allows token renewal to be taken care of with oidc-client
			but we keep our own timer and manually sign out users due to inactivity. */
		const signInInterval = setInterval(() => {
			if (!AuthHelper.isActive(lastActivity, 3600)) {
				// log out after an hour of inactivity
				logOut(userManager);
				dispatch({ type: 'APP/USER_LOGGED_OUT' });
			}

			if (!AuthHelper.isActive(lastActivity, 3300)) {
				// show warning after 55 minutes of inactivity
				setIsLogOutModalOpen(true);
			}
		}, 3000);

		return () => clearInterval(signInInterval);
	}, [lastActivity]);

	if (state.LoginStatus === 'Logged Out') {
		userManager && logOut(userManager);
	}

	if (state.LoginStatus === 'Awaiting Login') {
		return <LinearProgress />;
	}

	if (!isAuthorized) {
		return (
			<Grid container={true}>
				<Grid item={true} md={4} />
				<Grid item={true} md={4}>
					<StyledCard title="Not Authorized">
						You have not been given authorization to use this application. If you believe this is not
						correct, please contact{' '}
						<a href={`mailto:${settings.help.recipients}?subject=LandManager Access`}>Admin staff</a>.
					</StyledCard>
				</Grid>
			</Grid>
		);
	}

	return (
		<React.Fragment>
			{props.children}
			<HistoryTracker onChange={() => setLastActivity(new Date())} />

			<Dialog
				open={isLogOutModalOpen}
				onClose={({}, reason) => reason !== 'backdropClick' && closeModal()}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Log Out</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						You are about to be logged out due to inactivity. Click below to stay signed in.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleStaySignedInClick} color="secondary">
						Stay Logged In
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};
