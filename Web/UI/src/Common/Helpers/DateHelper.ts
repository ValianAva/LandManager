import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import parse from 'date-fns/parse';
import getYear from 'date-fns/getYear';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export const getDateString = (date: Date): string => {
	const defaultDateValue = '0001-01-01T00:00:00';
	const defaultDate = new Date(Date.parse(defaultDateValue));

	if (date.valueOf() === defaultDate.valueOf()) {
		return defaultDate.toDateString();
	}

	return date.toDateString();
};

/** Returns the given date in M/d/yyyy format */
export const getShortDateString = (date: string | Date | undefined | null): string => {
	if (date === undefined || date === null) {
		return '';
	}

	if (date instanceof Date) {
		return format(date, 'M/d/yyyy');
	}

	// just make into a string and parse again since some dates were not actual date objects. I have no answers
	return format(parseISO(date.toString()), 'M/d/yyyy');
};

/** Attempts to parse a date string in M/d/yyyy format */
export const parseShortDate = (dateString: string | undefined | null): Date | undefined => {
	if (dateString === undefined || dateString === null) {
		return undefined;
	}

	return parse(dateString, 'M/d/yyyy', new Date());
};

export const getDateTimeString = (date: Date): string => {
	if (date === undefined || date === null) {
		return '';
	}

	// just make into a string and parse again since some dates were not actual date objects. I have no answers
	return format(parseISO(date.toString()), 'M/d/yy h:mm aaa');
};

export const calculateDaysDifference = (date1: Date, date2: Date): number => {
	const millisecondsInADay = 1000 * 60 * 60 * 24;
	const date1InMS = date1.getTime();
	const date2InMS = date2.getTime();
	const difference = date2InMS - date1InMS;
	return Math.round(difference / millisecondsInADay);
};

// to be used for converting dates to ISO strings in local time.
export const toLocalISOString = (date: Date): string => {
	return date.toISOString().slice(0, -1); // cut the Z off the end so it's not in UTC time.
};

export const timeSince = (date: Date): string => {
	if (calculateDaysDifference(new Date(), date) < 7) {
		return formatDistanceToNow(date, {
			addSuffix: true,
		});
	} else {
		return getShortDateString(date);
	}
};

export const jlusYears = (date: Date) => {
	const year = date.getFullYear();
	const years = [];
	let start = year - 20;
	while (start <= year) {
		years.push(start++);
	}
	return years;
};

export const fiscalYear = (date: Date) => {
	// use 9 since months are 0 based
	return date.getMonth() < 9 ? date.getFullYear() : date.getFullYear() + 1;
};

export const currentFiscalYear = () => {
	// use 9 since months are 0 based
	return fiscalYear(new Date());
};

export const previousFiscalYear = (date: Date): number => {
	return getYear(date) - 1;
};
