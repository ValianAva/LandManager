import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { uppercaseFirst } from 'Common/Helpers/TextHelper';
import { Alert } from '@material-ui/lab';

export interface IDeleteConfirmProps {
	/** The name of the item to be deleted (i.e. Obligation, Partner, etc.) */
	label: string;
	additionalWarning?: string;
	warningLevel?: 'info' | 'warning' | 'error';
	/** A boolean value that determines if the modal is open or not */
	isOpen: boolean;
	/** Should be function in the calling component that will handle the delete */
	onConfirm: () => void;
	/** Passes onClose function value from the calling component */
	onCancel: () => void;
	/** Passes the onAdditionalAction function value from the calling component */
	onAdditionalAction?: () => void;
	/** Label for the additional action button */
	addionalActionLabel?: string;
	warningText?: string;
}

export const DeleteConfirmation = (props: IDeleteConfirmProps) => {
	const level = props.warningLevel ? props.warningLevel : 'info';
	return (
		<Dialog maxWidth="xs" open={props.isOpen} onClose={() => props.onCancel()} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Delete {uppercaseFirst(props.label)}</DialogTitle>
			<DialogContent>
				{props.warningText || `Are you sure you want to delete this ${props.label.toLowerCase()}?`}
				{(props.additionalWarning && <Alert severity={level}>{props.additionalWarning}</Alert>) || ''}
			</DialogContent>
			<DialogActions>
				<Button onClick={props.onCancel} variant="text">
					Cancel
				</Button>
				{props.onAdditionalAction && (
					<Button onClick={props.onAdditionalAction}>{props.addionalActionLabel}</Button>
				)}
				<Button color={props.onAdditionalAction ? 'secondary' : 'primary'} onClick={props.onConfirm}>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
};
