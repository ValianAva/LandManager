import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';

import { Layout } from './';
import { GlobalErrorBoundary } from 'Common/Errors';
import { useAppState } from 'Common/Context/AppProvider';
import settings from 'settings';
import { darkTheme, overallTheme } from 'Common/Layout/Themes';

export const App = () => {
	const state = useAppState();

	return (
		<GlobalErrorBoundary>
			<BrowserRouter basename={'/' + settings.pathBase}>
				<ThemeProvider
					theme={state.Theme === 'dark' ? darkTheme(settings.siteColor) : overallTheme(settings.siteColor)}
				>
					<Layout />
				</ThemeProvider>
			</BrowserRouter>
		</GlobalErrorBoundary>
	);
};
