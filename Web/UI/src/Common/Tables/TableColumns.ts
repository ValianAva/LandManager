import { Column } from '@material-table/core';
import { commas, money, percentage } from 'Common/Helpers/TextHelper';
import { TableFilters, TableStyles } from '.';
import { ReactElement } from 'react';
import { getShortDateString } from 'Common/Helpers/DateHelper';
import { DatePicker } from 'Common/Tables/TableComponents';

type EditValues = 'never' | 'onUpdate';
// moving optional props to an object so we can essentially take advantage of named parameters
type OtherProps<T> = {
	render?: (row: T) => ReactElement;
	editable?: EditValues;
	hidden?: boolean;
	scale?: number;
	disableFormatting?: boolean;
};

// eslint-disable-next-line @typescript-eslint/prefer-as-const
const defaultOtherProps = { editable: 'never' as 'never', hidden: false, scale: 0, disableFormatting: false };

// putting this in a hook so we only have to specify the generic type once
export const useColumns = <T extends object>() => {
	const serviceList = (services: string[]) => {
		return [...new Set(services.map(i => i))].sort((a, b) => a.localeCompare(b));
	};

	const textColumn = (title: string, fieldName: KeysOfType<T, string>, otherProps?: OtherProps<T>) => {
		const { editable, hidden, render } = { ...defaultOtherProps, ...otherProps };
		return {
			title,
			field: fieldName,
			render,
			cellStyle: TableStyles.denseStyle,
			customFilterAndSearch: (term, rowData) => TableFilters.FilterText(term, rowData[fieldName] as string),
			editable,
			hidden,
		} as Column<T>;
	};

	const arrayColumn = (title: string, fieldName: KeysOfType<T, string[]>) => {
		return {
			title,
			field: fieldName,
			render: row => (row[fieldName] as string[]).sort((a, b) => a.localeCompare(b)).join(', '),
			exportTransformer: row => (row[fieldName] as string[]).sort((a, b) => a.localeCompare(b)).join(', '),
			cellStyle: TableStyles.denseStyle,
			customFilterAndSearch: (term, rowData) => TableFilters.FilterText(term, rowData[fieldName] as string),
			editable: 'never',
		} as Column<T>;
	};

	const linkColumn = (title: string, fieldName: KeysOfType<T, string>) => {
		return {
			title,
			field: fieldName,
			cellStyle: TableStyles.denseStyle,
			customFilterAndSearch: (term, rowData) => TableFilters.FilterText(term, rowData[fieldName] as string),
			editable: 'never',
		} as Column<T>;
	};

	const currencyColumn = (title: string, fieldName: KeysOfType<T, number>, otherProps?: OtherProps<T>) => {
		const { editable, hidden } = { ...defaultOtherProps, ...otherProps };
		return {
			title,
			field: fieldName,
			cellStyle: TableStyles.denseStyle,
			render: rowData => money(rowData[fieldName] as number),
			customFilterAndSearch: (term, rowData) => TableFilters.FilterNumber(term, rowData[fieldName] as number),
			editable,
			hidden,
		} as Column<T>;
	};

	/** A currency column not tied to a named property, but is instead calculated based on the supplied method */
	const calcCurrencyColumn = (title: string, val: (row: T) => number) => {
		return {
			title,
			cellStyle: TableStyles.denseStyle,
			render: rowData => money(val(rowData)),
			editable: 'never',
		} as Column<T>;
	};

	const percentColumn = (title: string, fieldName: KeysOfType<T, number>) => {
		return {
			title,
			field: fieldName,
			cellStyle: TableStyles.denseStyle,
			render: rowData => percentage(rowData[fieldName] as number),
			customFilterAndSearch: (term, rowData) => TableFilters.FilterNumber(term, rowData[fieldName] as number),
			editable: 'never',
		} as Column<T>;
	};

	/** A percent column not tied to a named property, but is instead calculated based on the supplied method */
	const calcPercentColumn = (title: string, val: (row: T) => number) => {
		return {
			title,
			cellStyle: TableStyles.denseStyle,
			render: rowData => percentage(val(rowData)),
			editable: 'never',
		} as Column<T>;
	};

	const numberColumn = (
		title: string,
		fieldName: KeysOfType<T, number | Nullable<number>>,
		otherProps?: OtherProps<T>
	) => {
		const { editable, disableFormatting, scale, hidden } = { ...defaultOtherProps, ...otherProps };
		return {
			title,
			field: fieldName,
			cellStyle: TableStyles.denseStyle,
			render: rowData =>
				disableFormatting ? rowData[fieldName] : commas(rowData[fieldName] as Nullable<number>, scale),
			customFilterAndSearch: (term, rowData) =>
				TableFilters.FilterNumber(term, rowData[fieldName] as Nullable<number>),
			editable,
			hidden,
		} as Column<T>;
	};

	const dateColumn = (title: string, fieldName: KeysOfType<T, Nullable<Date>>, otherProps?: OtherProps<T>) => {
		const { editable, hidden } = { ...defaultOtherProps, ...otherProps };
		return {
			title,
			field: fieldName,
			render: rowData => getShortDateString(rowData[fieldName] as Nullable<Date>),
			customFilterAndSearch: (term, rowData) =>
				TableFilters.FilterDate(term, rowData[fieldName] as Nullable<Date>),
			exportTransformer: rowData => getShortDateString(rowData[fieldName] as Nullable<Date>),
			editable,
			hidden,
			type: 'date',
			dateSetting: { format: 'M/d/yyyy' },
			filterComponent: DatePicker,
		} as Column<T>;
	};

	const serviceColumn = (fieldName: KeysOfType<T, string[] | string>) => {
		return {
			title: 'Service(s)',
			field: fieldName,
			cellStyle: TableStyles.denseStyle,
			render: rowData =>
				Array.isArray(rowData[fieldName])
					? serviceList(rowData[fieldName] as string[]).join(', ')
					: rowData[fieldName],
			customFilterAndSearch: (term, rowData) =>
				TableFilters.FilterText(
					term,
					Array.isArray(rowData[fieldName])
						? serviceList(rowData[fieldName] as string[]).join(', ')
						: (rowData[fieldName] as string)
				),
			// just hard-coding this for now since showing just unique service names was troublesome
			lookup: {
				Admin: 'Admin',
				Maintenance: 'Maintenance',
				Research: 'Research',
			},
			editable: 'never',
		} as Column<T>;
	};

	return {
		arrayColumn,
		textColumn,
		linkColumn,
		currencyColumn,
		calcCurrencyColumn,
		percentColumn,
		calcPercentColumn,
		numberColumn,
		dateColumn,
		serviceColumn,
	};
};
