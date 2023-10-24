import React from 'react';
import { Route, Switch } from 'react-router';
import { SignInManager } from 'Common/Utilities';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import * as Pages from 'SSO/Pages';
import * as CommonPages from 'Common/Pages';
import * as AdminPages from 'SSO/Pages/Admin';
import { NavDrawerContent } from './';
import { AppBar, NavDrawerToggle } from 'Common/Layout';

import sidebarBg from 'SSO/Assets/img/background.jpg';
import { contentTheme } from 'Common/Layout/Themes';
import { useAppStyles } from 'Common/Layout/Styles';
import { Disclaimer } from 'Common/Modals';

export const Layout = () => {
	const classes = useAppStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar />
			<NavDrawerToggle backgroundImage={sidebarBg}>
				<NavDrawerContent />
			</NavDrawerToggle>
			<ThemeProvider theme={overallTheme => ({ ...overallTheme, ...contentTheme })}>
				<main id="main" className={classes.content}>
					<div className={classes.appBarSpacer} />
					<SignInManager app="SSO">
						<Switch>
							<Route exact={true} path="/" component={Pages.Home} />
							<Route path="/profile" component={Pages.Profile} />
							<Route path="/password" component={Pages.Password} />

							<Route exact={true} path="/users" component={AdminPages.Users} />
							<Route exact={true} path="/users/add" component={AdminPages.AddUser} />
							<Route path="/users/:id" component={AdminPages.EditUser} />

							<Route path="/" component={CommonPages.NotFound} />
						</Switch>
					</SignInManager>
				</main>
			</ThemeProvider>
			<Disclaimer app="SSO">
				<p>
					You are accessing an information system that is provided for authorized use only.
				</p>

				<p>
					This website [the LandManager Single Sign On] is an internal planning and management tool. Access to the
					LandManager Single Sign On is restricted to authorized users only. The data contained within the LandManager Single Sign On is not
					intended for distribution beyond authorized users in support of the program and implementation thereof.
				</p>
			</Disclaimer>
		</div>
	);
};
