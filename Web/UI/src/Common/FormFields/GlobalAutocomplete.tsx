/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FieldProps, getIn } from 'formik';
import { TextField } from '@material-ui/core';
import { debounce } from '@material-ui/core/utils';
import MuiAutocomplete, {
	AutocompleteInputChangeReason,
	AutocompleteRenderInputParams,
} from '@material-ui/lab/Autocomplete';

export interface IGlobalAutocompleteProps<T, V = void> extends FieldProps {
	label?: string;
	options: T[];
	/** For autosave selects or uncontrolled selects that just accept a value it should be set to true */
	setField?: boolean;
	valueChanged?: (v: T) => void;
	multiple?: boolean;
	getOptionLabel: (option: T) => string;
	getOptionId: (option: T) => string | number;
	freeSolo?: boolean;
	autoSelect: boolean;
	defaultValue: number | string;
	// the type of this could probably be changed later
	// this first attempt is to get climate hazards working since we'll
	// have two separate fields controlling one array
	getValueId?: (v: V) => string | number | string[] | number[];
	/** a way to filter selected value in the visible form component.
	 * e.g. v => v.isPrimary
	 */
	valueFilter?: (v: any) => any;
	/** a way to build an object back from the component's selected value.
	 * e.g. v => {id: v, isPrimary: true}
	 */
	valueConstructor?: (v: string | number) => any;
	multiline?: boolean;
}

/** Wraps the formik material ui autocomplete so we don't have to repeat all the error and helperText props */
export const GlobalAutocomplete = <T, V = void>(props: IGlobalAutocompleteProps<T, V>) => {
	const { field, form } = props;
	// tslint:disable-next-line: max-line-length
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { valueChanged, setField, getOptionId, getValueId, valueConstructor, valueFilter, options, ...propsToPass } =
		props; // destructure to exclude props we don't want to pass down
	const { name } = field;
	const { touched, errors } = form;
	const currentError = getIn(errors, name);
	const currentTouched = getIn(touched, name);
	const showError = currentTouched && !!currentError;

	// a way to transform an object field value to get the identifying value
	// that relates to the options (e.g. turn [{id: 1, isPrimary: true}, {id: 2, isPrimary: false}] into [1,2])
	let fieldValue = field.value;
	if (getValueId !== undefined) {
		fieldValue = Array.isArray(field.value)
			? field.value.map(v => getValueId && getValueId(v))
			: getValueId(field.value);
	}
	// get selected options based on field value(s)
	const value = Array.isArray(fieldValue)
		? props.options.filter(o => fieldValue.includes(getOptionId(o)))
		: (props.options.find(o => getOptionId(o) === fieldValue) as NonNullable<T>);

	const handleInputChange = (
		// eslint-disable-next-line @typescript-eslint/ban-types
		event: React.ChangeEvent<{}>,
		newValue: string,
		reason: AutocompleteInputChangeReason
	) => {
		event.persist();

		if (props.freeSolo === true && newValue !== fieldValue && reason === 'input') {
			form.setFieldValue(name, value);
		}
		if (!props.freeSolo === true && reason === 'clear') {
			form.setFieldValue(name, props.defaultValue);
		}
	};

	// filter selected field values based on a separate condition that each selected value must match (e.g. isPrimary == true)
	// we have to relate options and values since options only have display values (id, name) while values may
	// only have non-visible props (id, isPrimary) to get from display label to filter value (name -> id -> isPrimary)
	// only appies to multi-selects
	let filteredValue = fieldValue;
	if (!props.freeSolo) {
		filteredValue = value;
		if (valueFilter !== undefined && getValueId !== undefined && Array.isArray(field.value)) {
			const filteredValues = field.value.filter(valueFilter);
			filteredValue = props.options.filter(o => filteredValues.map(v => getValueId(v)).includes(getOptionId(o)));
		}
	}

	let myOptions = options;
	// assume there are other components controlling values if valueFilter is applied
	if (valueFilter && getValueId && Array.isArray(field.value)) {
		const otherValues = field.value.filter(v => !field.value.filter(valueFilter).includes(v));
		myOptions = options.filter(o => !otherValues.map(v => getValueId(v)).includes(getOptionId(o)));
	}

	return (
		<MuiAutocomplete
			{...propsToPass}
			options={myOptions}
			freeSolo={props.freeSolo}
			disabled={form.isSubmitting}
			value={filteredValue}
			renderInput={(params: AutocompleteRenderInputParams) => (
				<TextField
					{...params}
					key={params.id}
					label={props.label}
					error={showError}
					helperText={currentTouched && currentError}
					multiline={props.multiline}
				/>
			)}
			onChange={(e, newValue: any | null) => {
				if (props.setField !== false) {
					if (valueFilter && !valueConstructor) {
						throw new Error('valueConstructor must be specified if valueFilter is specified.');
					}
					// get the values managed by just this component
					// making the assumption that if valueFilter is set then there's another component
					// sharing the same formik values for this field. We will then only manipulate
					// the item's controlled by this component
					if (valueFilter && valueConstructor && Array.isArray(field.value)) {
						// values not controlled by this component. These will be in their raw format without any getValueId or anything applied
						const otherValues = field.value.filter(v => !field.value.filter(valueFilter).includes(v));
						newValue = [...otherValues, ...newValue.map((v: T) => valueConstructor(getOptionId(v)))];
					}

					// allow the autocomplete component to set a formik value that differs from what
					// is shown as options. e.g. return an object array from a number array
					if (valueConstructor) {
						// leave newValue alone since value construction would've been taken care of above
						// when merging in values not controlled by this component
						form.setFieldValue(name, newValue);
					} else {
						form.setFieldValue(
							name,
							props.multiple ? newValue.map((v: T) => getOptionId(v)) : getOptionId(newValue)
						);
					}
				}
				props.valueChanged && props.valueChanged(newValue);
				return true;
			}}
			onInputChange={() => debounce(handleInputChange, 750)}
			disableCloseOnSelect={props.multiple === true}
		/>
	);
};
