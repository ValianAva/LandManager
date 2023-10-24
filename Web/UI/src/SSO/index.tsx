// tslint:disable-next-line: no-import-side-effect
import 'core-js';
// tslint:disable-next-line: no-import-side-effect
import 'regenerator-runtime/runtime';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from 'SSO/Layout';

import * as Sentry from '@sentry/react';
import settings from 'settings';

// tslint:disable-next-line: no-import-side-effect
import 'Common/Assets/img/DOD-Seal.png';
// tslint:disable-next-line: no-import-side-effect
import 'SSO/Assets/global.css';
import { AppProvider } from 'Common/Context/AppProvider';
import { SnackbarProvider } from 'notistack';

Sentry.init({ dsn: settings.sentry.dsn, environment: settings.sentry.environment });

ReactDOM.render(
	<SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
		<AppProvider>
			<App />
		</AppProvider>
	</SnackbarProvider>,
	document.getElementById('app')
);

declare let module: any;
if (module.hot) {
	module.hot.accept();
}
