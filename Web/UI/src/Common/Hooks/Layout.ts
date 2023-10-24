import { useEffect, useState } from 'react';

/** Returns the height and width of the main part of the application (i.e. the main tag) */
export const useAppSize = () => {
	const main = document.getElementById('main');

	if (!main) {
		return { width: 0, height: 0 };
	}

	const [appSize, setAppSize] = useState({
		width: main.offsetWidth,
		height: main.offsetHeight,
	});

	useEffect(() => {
		window.addEventListener('resize', () => {
			setAppSize({ width: main.offsetWidth, height: main.offsetHeight });
		});

		return () => {
			window.removeEventListener('resize', () => {
				setAppSize({ width: main.offsetWidth, height: main.offsetHeight });
			});
		};
	}, []);

	return appSize;
};
