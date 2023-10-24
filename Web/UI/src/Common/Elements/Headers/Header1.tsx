import { Typography } from '@material-ui/core';
import React from 'react';
import { HeaderProps, useHeaderStyles } from './Headers';
import classNames from 'classnames';

export const Header1 = (props: HeaderProps) => {
	const classes = useHeaderStyles();
	return (
		<Typography variant="h1" className={classNames(classes.header, props.className)}>
			{props.title}
		</Typography>
	);
};
