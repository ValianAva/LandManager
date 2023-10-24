import React from 'react';
import { Button, Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Add as AddIcon, Edit as EditIcon } from '@material-ui/icons';
import { useAppState } from 'Common/Context/AppProvider';
import LockIcon from '@material-ui/icons/Lock';
import SaveIcon from '@material-ui/icons/Save';

type ButtonAction =
	| 'default'
	| 'add'
	| 'assign'
	| 'edit'
	| 'evaluate'
	| 'view'
	| 'archive'
	| 'lock'
	| 'promote'
	| 'demote';

type ButtonColor = 'primary' | 'secondary' | 'default';

type ButtonVariant = 'text' | 'outlined' | 'contained';

type ButtonSize = 'small' | 'medium' | 'large';

export interface IEnhancedButtonProps {
	action?: ButtonAction;
	label?: string;
	text?: string;
	color?: ButtonColor;
	submit?: boolean;
	isSubmitting?: boolean;
	icon?: JSX.Element;
	disableIcon?: boolean;
	fullWidth?: boolean;
	margin?: boolean;
	variant?: ButtonVariant;
	size?: ButtonSize;
	disabled?: boolean;
	className?: string;
	overrideSiteLock?: boolean;
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			justifyContent: 'flex-end',
		},
		buttonMargin: {
			marginLeft: theme.spacing(1),
			marginRight: theme.spacing(1),
		},
	})
);

export const EnhancedButton = (props: IEnhancedButtonProps) => {
	const classes = useStyles();
	const state = useAppState();

	let initialText = 'Submit';
	let submitText = 'Submitting';
	let icon = props.icon ? props.icon : undefined;
	if (props.action === 'add') {
		initialText = 'Add';
		submitText = 'Adding';
		icon = <AddIcon />;
	} else if (props.action === 'assign') {
		initialText = 'Assign';
		submitText = 'Assigning';
		icon = <AddIcon />;
	} else if (props.action === 'edit') {
		initialText = 'Save';
		submitText = 'Saving';
		icon = <EditIcon />;
	} else if (props.action === 'evaluate') {
		initialText = 'Save';
		submitText = 'Saving';
		icon = <SaveIcon />;
	} else if (props.action === 'view') {
		initialText = 'View';
		submitText = 'Loading';
	} else if (props.action === 'archive') {
		initialText = 'Archive';
		submitText = 'Archiving';
	} else if (props.action === 'lock') {
		initialText = 'Lock';
		submitText = 'Locking';
		icon = <LockIcon />;
	} else if (props.action === 'promote') {
		initialText = 'Promote';
		submitText = 'Promoting';
	} else if (props.action === 'demote') {
		initialText = 'Demote';
		submitText = 'Demoting';
	}

	if (props.label) {
		initialText += ` ${props.label}`;
		submitText += ` ${props.label}`;
	}

	submitText += '...';

	if (props.disableIcon) {
		icon = undefined;
	}

	const className = props.margin ? `${classes.buttonMargin} ${props.className}` : props.className;
	const buttonText = props.text || (props.isSubmitting ? submitText : initialText);

	return (
		<div className={classes.root}>
			<Button
				type={props.submit ? 'submit' : 'button'}
				color={props.color}
				startIcon={icon}
				fullWidth={props.fullWidth}
				variant={props.variant}
				size={props.size}
				className={className}
				disabled={props.disabled || (!props.overrideSiteLock ? state.SiteLocked : '') || props.isSubmitting}
				onClick={props.onClick}
			>
				{buttonText}
			</Button>
		</div>
	);
};
