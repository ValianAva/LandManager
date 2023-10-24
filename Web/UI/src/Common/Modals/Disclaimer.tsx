import { useSessionStorage } from 'Common/Helpers/ReactHelper';
import { Apps } from 'Common/Models/AppModels';
import React, { useEffect, useState } from 'react';
import settings from 'settings';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

export interface IDisclaimerProps {
	app: Apps;
}

export const Disclaimer: React.FC<IDisclaimerProps> = props => {
	const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
	const [hasDisclaimerShown, setHasDisclaimerShown] = useSessionStorage('hasDisclaimerShown-' + props.app, 'false');

	useEffect(() => {
		if (settings.showDisclaimer && hasDisclaimerShown !== 'true') {
			setIsDisclaimerOpen(true);
		}
	}, []);

	const handleDisclaimerClose = () => {
		setIsDisclaimerOpen(false);
		setHasDisclaimerShown('true');
	};

	return (
		<Dialog
			open={isDisclaimerOpen}
			onClose={({}, reason) => !['backdropClick', 'escapeKeyDown'].includes(reason) && handleDisclaimerClose()}
			aria-labelledby="disclaimer-dialog-title"
			aria-describedby="disclaimer-dialog-description"
			maxWidth="sm"
			disableEscapeKeyDown={true}
		>
			<DialogTitle id="disclaimer-dialog-title">Disclaimer</DialogTitle>
			<DialogContent dividers={true}>
				<DialogContentText id="disclaimer-dialog-description">{props.children}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleDisclaimerClose}>OK</Button>
			</DialogActions>
		</Dialog>
	);
};
