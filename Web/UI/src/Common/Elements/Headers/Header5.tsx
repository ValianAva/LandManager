import { Typography } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import { HeaderProps, useHeaderStyles } from './Headers';

export const Header5 = (props: HeaderProps) => {
	const classes = useHeaderStyles();
	return (
		<Typography variant="h5" className={classNames(classes.header, props.className)}>
			{props.title}
		</Typography>
	);
};
