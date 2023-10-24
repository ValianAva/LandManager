/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.jpg' {
	const value: any;
	export = value;
}

declare module '*.pdf' {
	const value: any;
	export = value;
}

declare module '*.xlsx' {
	const value: any;
	export = value;
}

type Nullable<T> = T | null;

type KeysOfType<O, T> = {
	[K in keyof O]: O[K] extends T ? K : never;
}[keyof O];
