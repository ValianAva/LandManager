import differenceInSeconds from 'date-fns/differenceInSeconds';

/** Returns a boolean indicating if the supplied lastActivity is within the past hour */
export const isActive = (lastActivity: Date, timeout: number): boolean => {
	const now = new Date();
	const d = differenceInSeconds(now, lastActivity);

	// if last user activity is greater than an hour ago, renew the token
	if (d < timeout) {
		//console.log('user has been active within specified timeout period of', timeout, 'seconds');
		return true;
	}

	return false;
};
