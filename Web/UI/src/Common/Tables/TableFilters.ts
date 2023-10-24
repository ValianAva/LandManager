import { DateHelper } from 'Common/Helpers';

/** Boolean indicating the supplied term matches the supplied value.
 * Capable of greater than and less than.
 * Can be used for money, decimal, and percentage
 */
export const FilterNumber = (term: string, value?: Nullable<number>) => {
	// just return false if the value is undefined or null
	if (value === undefined || value === null) {
		return false;
	}

	// replace all commas and empty decimal places in search term since we compare to the underlying number for a cell
	term = term.replace(/,/g, '').replace('.00', '');

	// first, try just a straight match
	if (value.toString().includes(term)) {
		return true;
	}

	// allow for searching multiple exact number matches
	if (term.includes(';') || term.includes(' or ')) {
		for (const d of term.split(/;| or /)) {
			if (d !== '' && value.toString().trim().includes(d.trim())) {
				return true;
			}
		}
	}

	// check gt and lt if string contains comparison and rest of string is a number
	// start with more restrictive conditions first
	if (term.startsWith('>=')) {
		const numberTerm = Number(term.replace('>=', '').trim());
		if (!isNaN(numberTerm)) {
			return value >= numberTerm;
		}
	}

	if (term.startsWith('>')) {
		const numberTerm = Number(term.replace('>', '').trim());
		if (!isNaN(numberTerm)) {
			return value > numberTerm;
		}
	}

	if (term.startsWith('<=')) {
		const numberTerm = Number(term.replace('<=', '').trim());
		if (!isNaN(numberTerm)) {
			return value <= numberTerm;
		}
	}

	if (term.startsWith('<')) {
		const numberTerm = Number(term.replace('<', '').trim());
		if (!isNaN(numberTerm)) {
			return value < numberTerm;
		}
	}

	return false;
};

/** Boolean indicating the supplied term matches the supplied value.
 * Capable of greater than and less than.
 */
export const FilterDate = (term: string | Date, value?: Date | null) => {
	// just return false if the value is undefined or null
	if (value === undefined || value === null) {
		return false;
	}

	if (term instanceof Date) {
		term = DateHelper.getShortDateString(term);
	}

	// first, try just a straight match
	const dateString = DateHelper.getShortDateString(value);
	if (dateString.includes(term)) {
		return true;
	}

	// allow for searching multiple exact date matches
	if (term.includes(';') || term.includes(' or ')) {
		for (const d of term.split(/;| or /)) {
			if (d !== '' && dateString.trim().includes(d.trim())) {
				return true;
			}
		}
	}

	// turn the date into an actual date object instead of an ISO date thing
	// without this, it'll console log out something like 2017-07-01T00:00:00
	value = DateHelper.parseShortDate(DateHelper.getShortDateString(value));
	if (value === undefined) {
		return false;
	}

	// allow for searching date range with a dash
	if (term.includes('-')) {
		const startDate = DateHelper.parseShortDate(term.split('-')[0].trim());
		const endDate = DateHelper.parseShortDate(term.split('-')[1].trim());

		if (startDate !== undefined && endDate !== undefined) {
			return value >= startDate && value <= endDate;
		}
	}

	// check gt and lt if string contains comparison and rest of string is a date
	// start with more restrictive conditions first
	if (term.startsWith('>=')) {
		// if the term is only a year, default it to 12/31 of that year
		if (!term.includes('/')) {
			term = '12/31/' + term;
		}
		const dateTerm = DateHelper.parseShortDate(term.replace('>=', '').trim());
		if (dateTerm !== undefined) {
			return value >= dateTerm;
		}
	}

	if (term.startsWith('>')) {
		// if the term is only a year, default it to 12/31 of that year
		if (!term.includes('/')) {
			term = '12/31/' + term;
		}
		const dateTerm = DateHelper.parseShortDate(term.replace('>', '').trim());
		if (dateTerm !== undefined) {
			return value > dateTerm;
		}
	}

	if (term.startsWith('<=')) {
		// if the term is only a year, default it to 1/1 of that year
		if (!term.includes('/')) {
			term = '1/1/' + term;
		}
		const dateTerm = DateHelper.parseShortDate(term.replace('<=', '').trim());
		if (dateTerm !== undefined) {
			return value <= dateTerm;
		}
	}

	if (term.startsWith('<')) {
		// if the term is only a year, default it to 1/1 of that year
		if (!term.includes('/')) {
			term = '1/1/' + term;
		}
		const dateTerm = DateHelper.parseShortDate(term.replace('<', '').trim());
		if (dateTerm !== undefined) {
			return value < dateTerm;
		}
	}

	return false;
};

/** Boolean indicating the supplied term matches the supplied value.
 * Capable of greater than and less than.
 * Can be used for money, decimal, and percentage
 */
export const FilterText = (term: string | string[], value?: string) => {
	// just return false if the value is undefined or null
	// TS warns the value will never be null, but that doesn't seem to be the case
	// tslint:disable-next-line: strict-type-predicates
	if (value === undefined || value === null) {
		return false;
	}

	// lookup columns will pass in search term as an array
	// just need to join the items so the rest of this method works as originally designed
	if (Array.isArray(term)) {
		term = term.join(',');
	}

	// normalize to lower case so searches don't have to be case sensitive
	term = term.toLowerCase();
	value = value.toLowerCase();

	// first, try just a straight match
	if (value.includes(term)) {
		return true;
	}

	// allow for searching multiple exact string matches
	if (term.includes(';') || term.includes(' or ')) {
		for (const d of term.split(/;| or /)) {
			if (d !== '' && value.trim().includes(d.trim())) {
				return true;
			}
		}
	}

	return false;
};
