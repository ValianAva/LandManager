import React from 'react';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export interface IMinimizeIconProps {
	isMinimized: boolean;
	onClick: () => void;
}

export const MinimizeIcon = (props: IMinimizeIconProps) => {
	return props.isMinimized ? <ExpandMoreIcon onClick={props.onClick} /> : <ExpandLessIcon onClick={props.onClick} />;
};
