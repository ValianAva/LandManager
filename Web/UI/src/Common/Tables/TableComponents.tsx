import * as React from 'react';
import { MTableBodyRow } from '@material-table/core';
import { KeyboardDatePicker } from '@material-ui/pickers';

// https://stackoverflow.com/a/62317095
export const DoubleClickEditRow = (props: any) => (
	<MTableBodyRow
		{...props}
		onDoubleClick={(e: MouseEvent) => {
			// the index of the edit action changes based on how many other actions we
			// add to each table. I noticed it's currently the only one that doesn't have
			// a tooltip so I'm arbitrarily using that as a condition to get that action
			const editIndex = props.actions.findIndex((a: any) => !a.tooltip);
			// warning: position of edit action may change if we add more actions
			props.actions[editIndex]().onClick(e, props.data);
		}}
	/>
);

export const DatePicker = (props: any) => {
	const [date, setDate] = React.useState<Date | null>(null);

	return (
		<KeyboardDatePicker
			autoOk={true}
			id="date-picker-dialog"
			format="M/d/yyyy"
			clearable
			value={date}
			onChange={(event: Date) => {
				setDate(event);
				props.onFilterChanged(props.columnDef.tableData.id, event);
			}}
			KeyboardButtonProps={{
				'aria-label': 'change date',
			}}
		/>
	);
};
