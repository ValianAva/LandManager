import he from 'he';

export const truncate = (str: string, length = 100, ending = '...'): string => {
	if (str.length > length) {
		return str.substring(0, length - ending.length) + ending;
	}
	return str;
};

export const isEmptyOrWhitespace = (str: string): boolean => {
	return !str || str.length === 0 || /^\s*$/.test(str);
};

/** Formats the supplied number to currency with exactly two decimal places */
export const money = (x: number | undefined | null): string => {
	if (x == null) {
		x = 0;
	}
	const curr = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(x);

	return curr;
};

/** Sums mulitple numbers and applies the supplied formatted. Mainly done so we're not littering the code base with coalescing to 0 */
export const sum = (numbers: (Nullable<number> | number)[], formatter = commas) => {
	return formatter(numbers.reduce((acc, item) => (acc ?? 0) + (item ?? 0), 0));
};

export const percentage = (x: number | undefined): string => {
	x = x ? x : 0;
	const percent = x.toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 0 }) + '%';

	return percent;
};

export const decimal = (x: number | undefined): string => {
	let deci = '0.00';
	if (x !== undefined) {
		deci = x.toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
	}

	return deci;
};

export const commas = (x: number | undefined | null, scale = 0): string => {
	let num = '0';
	if (x != null) {
		num = x.toLocaleString('en-us', { maximumFractionDigits: scale });
	}

	return num;
};

export const largeNumbers = (x: number | undefined): string => {
	let num = 0;
	let returnNum = '0';
	if (x !== undefined) {
		if (x >= 1000000) {
			num = x / 1000000;
			returnNum = num + 'M';
		} else if (x >= 100000) {
			num = x / 1000;
			returnNum = num + 'K';
		} else {
			returnNum = commas(x);
		}
	}

	return returnNum;
};

/** Decodes and displays HTML */
export const displayText = (s: string | null) => {
	if (s === null) {
		return '';
	}
	return he.decode(s.replace(/(<([^>]+)>)/gi, ''));
};

export const makeUpperCase = (s: string) => {
	/** This will make the first letter of a word uppercase  */
	const x = s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
	return x;
};

export const uppercaseFirst = (s: string) => {
	/** This will make the first letter of a word or words uppercase  */
	let x = '';
	const words = [];
	if (s.indexOf(' ') !== -1) {
		const str = s.split(' ');
		// tslint:disable-next-line: prefer-for-of
		for (let i = 0; i < str.length; i++) {
			words.push(makeUpperCase(str[i]));
		}
		x = words.join(' ');
	} else {
		x = makeUpperCase(s);
	}
	return x;
};

export const scoreDecimal = (x: number | undefined): string => {
	let deci = '0.0';
	if (x !== undefined) {
		deci = x.toLocaleString('en-us', { maximumFractionDigits: 1, minimumFractionDigits: 1 });
	}

	return deci;
};
