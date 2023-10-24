import React from 'react';
import { ErrorBoundary } from '@sentry/react';

const FallbackComponent = () => {
	return <div>An error has occurred</div>;
};

export const GlobalErrorBoundary: React.FC = props => {
	return (
		<ErrorBoundary fallback={FallbackComponent} showDialog>
			{props.children}
		</ErrorBoundary>
	);
};
