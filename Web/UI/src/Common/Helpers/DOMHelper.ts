import settings from 'settings';

export const setPageTitle = (title: string): void => {
	document.title = `${title} | ${settings.siteName}`;
};
