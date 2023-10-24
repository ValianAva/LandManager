import { useEffect, useState } from 'react';

/** an array of T, or a Promise that returns an array of T */
export type ArrayPromise<T> = T[] | (() => Promise<T[]>);

export const useExternalData = <T>(data: ArrayPromise<T>) => {
	const [items, setItems] = useState<T[]>([]);

	// we need to directly return data here since using useExternalData in multiple components in a tree results in data not making it do the child component
	// 1. parent component uses hook that passes in an endpoint method
	// 2. data array is empty, that gets passed to child component
	// 3. parent component gets data and hook updates data items
	// 4. the dependency-less useEffect of child component has already run, so updated data is not passed to child
	if (Array.isArray(data)) {
		return data;
	}

	useEffect(() => {
		data().then(r => setItems(r));
	}, []);

	return items;
};
