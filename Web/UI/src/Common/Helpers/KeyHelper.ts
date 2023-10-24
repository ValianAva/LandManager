export const generateStorageKey = (type: string, id: number) => {
	const newKey = `${type}-${id}`;
	return newKey;
};
