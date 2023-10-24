import React from 'react';
import { Typography } from '@material-ui/core';

export interface ISmallHeaderProps {
	title: string;
	addSpacing?: boolean;
}

export const SmallHeader = (props: ISmallHeaderProps) => {
	const styles = { fontSize: '1.2rem', marginTop: '0', marginBottom: '0' };
	if (props.addSpacing) {
		styles.marginTop = '16px';
		styles.marginBottom = '8px';
	}
	return (
		<Typography variant="h5" style={styles}>
			{props.title}
		</Typography>
	);
};
