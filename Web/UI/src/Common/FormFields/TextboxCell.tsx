import React from 'react';
import { Textbox } from 'Common/FormFields';
import { TableCell } from '@material-ui/core';

export interface ITextboxCellProps {
	name: string;
}

export const TextboxCell = (props: ITextboxCellProps) => {
	return (
		<TableCell>
			<Textbox variant="filled" name={props.name} type="number" label="" minWidth={50} />
		</TableCell>
	);
};
