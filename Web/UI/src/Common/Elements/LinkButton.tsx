import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

export interface ILinkButtonProps {
	to: string;
	className?: string;
	icon?: JSX.Element;
	size?: 'small' | 'medium' | 'large';
}

export const LinkButton: React.FC<ILinkButtonProps> = props => {
	const icon = props.icon ? props.icon : undefined;
	return (
		<Button size={props.size} startIcon={icon} component={Link} to={props.to} className={props.className}>
			{props.children}
		</Button>
	);
};
