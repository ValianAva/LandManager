import { number, boolean, string, array, date, mixed } from 'yup';
import isValid from 'date-fns/isValid';
import { displayText } from 'Common/Helpers/TextHelper';

/** Schema for a required number that must be greater than or equal to zero or the provided minimum number */
export const numberSchema = (label: string, min = 0, condition = '') =>
	number()
		.transform(value => (isNaN(value) ? undefined : value)) // https://github.com/jquense/yup/issues/971#issuecomment-675528093
		.required(`${label} is required ${condition !== '' ? 'when ' : ''} ${condition}`)
		.typeError(`${label} must be a number`)
		.min(min, `${label} must be ${min} or above`);

/** Schema for a nullable number that must be greater than or equal to zero or the provided minimum number */
export const nullableNumberSchema = (label: string, min = 0) =>
	number().typeError(`${label} must be a number`).default(0).min(min, `${label} must be ${min} or above`).nullable();

/** Schema for a required percent that must be between 0 and 100 */
export const percentSchema = (label: string) =>
	number()
		.typeError(`${label} must be a number`)
		.required(`${label} is required`)
		.min(0, `${label} must be 0 or above`)
		.max(100, `${label} must be 100 or below`);

/** Schema for a non-null boolean */
export const booleanSchema = (label: string) =>
	boolean().typeError(`${label} must be a boolean`).required(`${label} is required`);

/** Schema for a required string */
export const stringSchema = (label: string | string[], limit = 250, condition = '') =>
	string()
		.required(
			`${Array.isArray(label) ? label.join(' ') : label} is required ${
				condition !== '' ? 'when ' : ''
			} ${condition}`
		)
		.test('len', `${limit} Character limit exceeded`, val => {
			if (val !== undefined) {
				return displayText(val).length <= limit;
			} else {
				return true;
			}
		});

/** Schema for a string that can't be undefined. Will still allow an empty string */
export const emptyStringSchema = (label: string, limit = 250) =>
	string()
		.test('len', `${limit} Character limit exceeded`, val => {
			return displayText(val ?? '').length <= limit;
		})
		.ensure()
		.defined();

/** Schema for a number array that must have at least one value */
export const arraySchema = (label: string, min = 1, condition = '') =>
	array()
		.of(number().defined())
		.defined()
		.min(min, `${label} must have at least 1 item selected ${condition !== '' ? 'when ' : ''} ${condition}`);

/** Schema for a string array that must have at least one value */
export const stringArraySchema = (label: string, min = 1, condition = '') =>
	array()
		.defined()
		.of(string().defined())
		.min(min, `${label} must have at least ${min} item selected ${condition !== '' ? 'when ' : ''} ${condition}`);

/** Schema for a required select that has a number id */
export const selectSchema = (label: string, min = 1, condition = '') =>
	number()
		.typeError(`${label} must be a number`)
		.required(`${label} is required ${condition !== '' ? 'when ' : ''} ${condition}`)
		.defined()
		.min(min, `${label} must have a selection ${condition !== '' ? 'when ' : ''} ${condition}`);

export const nullableSelectSchema = (label: string) =>
	number().defined().typeError(`${label} must be a number`).nullable();

const dateTransform = (curVal: unknown) => (isValid(curVal) ? curVal : undefined);

const dateTransformNull = (curVal: unknown) => (isValid(curVal) ? curVal : null);

export const dateSchema = (label: string) =>
	date().defined().transform(dateTransform).required(`${label} is required`).typeError(`${label} is required`);

export const nullableDateSchema = (label: string) =>
	date().defined().transform(dateTransformNull).typeError(`${label} is required`).nullable();

export const mixedArraySchema = (label: string) =>
	array().of(mixed()).min(1, `${label} must have at least 1 item selected`);
