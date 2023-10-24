import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { FormikConsumer } from 'formik';
import React, { useEffect, useState } from 'react';
import { Prompt, RouteComponentProps, withRouter } from 'react-router-dom';
import { Location } from 'history';

// code taken from https://michaelchan-13570.medium.com/using-react-router-v4-prompt-with-custom-modal-component-ca839f5faf39

export const UnsavedChangesWarning = (props: RouteComponentProps<any>) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [confirmedNavigation, setConfirmedNavigation] = useState(false);
	const [lastLocation, setLastLocation] = useState<Location | null>(null);

	useEffect(() => {
		if (confirmedNavigation && lastLocation) {
			// Navigate to the previous blocked location if confirmed by user
			props.history.push(lastLocation.pathname);
		}
	}, [confirmedNavigation, lastLocation]);

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleBlockedNavigation = (nextLocation: Location): boolean => {
		if (!confirmedNavigation) {
			setIsModalOpen(true);
			setLastLocation(nextLocation);
			return false;
		}
		return true;
	};

	const handleConfirmNavigationClick = () => {
		closeModal();
		setConfirmedNavigation(true);
	};

	return (
		<>
			<FormikConsumer>
				{formik => <Prompt when={formik.dirty} message={handleBlockedNavigation} />}
			</FormikConsumer>
			<Dialog
				open={isModalOpen}
				onClose={closeModal}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Unsaved Changes</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to leave this page? You have unsaved changes.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleConfirmNavigationClick} color="secondary">
						Yes
					</Button>
					<Button onClick={closeModal} color="primary" autoFocus>
						No
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export const UnsavedChangesWarningWithRouter = withRouter(UnsavedChangesWarning);
