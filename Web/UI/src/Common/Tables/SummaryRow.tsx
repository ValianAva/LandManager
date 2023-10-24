import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';

export interface ISummaryRowProps {
	title: string | React.ReactNode;
	value: string | JSX.Element | React.ReactNode;
	align?: 'left' | 'right' | 'center' | 'justify';
	style?: React.CSSProperties;
	variant?: 'body' | 'footer' | 'head';
}

export const SummaryRow = (props: ISummaryRowProps) => {
	return (
		<TableRow>
			<TableCell variant={props.variant ?? 'head'}>{props.title}</TableCell>
			<TableCell align={props.align || 'right'} style={props.style}>
				{props.value}
			</TableCell>
		</TableRow>
	);
};
