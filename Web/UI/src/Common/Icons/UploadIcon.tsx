import React from 'react';
import MuiUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

export interface IUploadIconProps {
	onClick?: () => void;
	isDisabled?: boolean;
	className?: string;
}

const useStyles = makeStyles(theme => ({
	actionIcon: {
		cursor: 'pointer',
	},
	icon: {
		color: '#00c0ef',
		marginRight: theme.spacing(1),
	},
	iconNotAllowed: {
		opacity: 0.4,
		cursor: 'not-allowed',
	},
}));

export const UploadIcon = (props: IUploadIconProps) => {
	const classes = useStyles();

	return (
		<MuiUploadIcon
			className={classNames(
				classes.icon,
				props.className,
				{ [classes.iconNotAllowed]: props.isDisabled },
				{ [classes.actionIcon]: props.onClick !== undefined }
			)}
			onClick={() => {
				if (props.isDisabled !== true && props.onClick) {
					props.onClick();
				}
			}}
		/>
	);
};
