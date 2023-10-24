import { DOMHelper } from 'Common/Helpers';
import { useEffect } from 'react';

export const usePageTitle = (title: string, deps: any[] = []) => {
	useEffect(() => {
		DOMHelper.setPageTitle(title);

		return () => {
			DOMHelper.setPageTitle('');
		};
	}, deps);
};
