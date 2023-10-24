/** Makes the values of the provided array's indexKey both the key and value of the resulting object
 * (e.g. [{leadServiceId: 'Admin'}, {leadServiceId: 'Maintenance'}] becomes {Admin: 'Admin', Maintenance: 'Maintenance'})
 */
export function toObject<T>(array: T[] | Readonly<T[]>, indexKey: keyof T) {
	const normalizedObject: any = {};
	for (const each of array) {
		normalizedObject[each[indexKey]] = each[indexKey];
	}
	return normalizedObject as { [key: string]: T };
}

/** Creates an array of objects. Each object has a group key, and its related items.
 * This does not perform aggregations
 */
export const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
	list.reduce((previous, currentItem) => {
		const currentGroup = getKey(currentItem);
		// make an empty group if it's not found yet
		if (previous.findIndex(p => p.group === currentGroup) === -1) previous.push({ group: currentGroup, items: [] });
		// add items to the group. use exclamation because we know it won't be undefined
		previous.find(p => p.group === currentGroup)!.items.push(currentItem);
		return previous;
	}, [] as { group: K; items: T[] }[]);

/** groups an array by the given key, and returns a single array with the key summed */
export const group = <T, G extends keyof any>(
	list: T[],
	groupKey: (item: T) => G,
	sumKey: (item: T) => string | number
) =>
	list.reduce((previous, currentItem) => {
		const currentGroup = groupKey(currentItem);
		const currentValue = sumKey(currentItem);
		const existingGroup = previous.find(p => p.group === currentGroup);

		// make an new group if it's not found yet
		if (existingGroup === undefined) {
			previous.push({ group: currentGroup, value: +currentValue });
		} else {
			// add to the existing group
			existingGroup.value += +currentValue;
		}

		return previous;
	}, [] as { group: G; value: number }[]);
