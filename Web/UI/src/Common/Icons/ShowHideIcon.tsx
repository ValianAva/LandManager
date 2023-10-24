import React from 'react';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';

export interface IShowHideIconProps {
	isHidden: boolean;
}

export const ShowHideIcon = (props: IShowHideIconProps) => {
	return props.isHidden ? <VisibilityIcon /> : <VisibilityOffIcon />;
};
