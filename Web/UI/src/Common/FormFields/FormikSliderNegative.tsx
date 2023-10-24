import React from 'react';
import { FieldProps } from 'formik';
import { Mark, Slider } from '@material-ui/core';

export interface FormikSliderNegativeProps extends FieldProps {
	min: number;
	max: number;
	marks: Mark[];
	restrict?: boolean;
	disabled?: boolean;
	baseValue: number;
}

export const FormikSliderNegative = (props: FormikSliderNegativeProps) => {
	const { field, form } = props;
	const { name } = field;
	const { isSubmitting } = form;

	// to get half tick marks to show up on the sliders properly
	// tried to do this dynamically but it turned into a cluster...
	const smallHalfTick = [
		{ value: 0.5, label: '' },
		{ value: 1.5, label: '' },
		{ value: 2.5, label: '' },
	];
	const halfTick: Mark[] = [
		{ value: -1, label: '' },
		{ value: 1, label: '' },
		{ value: 3, label: '' },
	];
	const marks =
		// filter out Above labels because it overcrowds the component to the point where it is unreadable
		props.max && props.max > 3
			? [...props.marks.filter(m => m.label && m.label.toString().indexOf('Above') === -1), ...halfTick]
			: props.marks && [...props.marks, ...smallHalfTick];
	marks && marks.sort((a, b) => a.value - b.value);

	return (
		<Slider
			disabled={isSubmitting || props.disabled}
			value={
				field.value < props.baseValue
					? field.value
					: field.value > props.baseValue
					? field.value
					: props.baseValue
			}
			aria-labelledby="discrete-slider-allowing-negative"
			valueLabelDisplay="auto"
			step={props.restrict && props.restrict ? null : 1}
			marks={marks}
			min={props.min}
			max={props.max}
			onChange={(event, newValue) => {
				form.setFieldValue(name, newValue);
			}}
		/>
	);
};
