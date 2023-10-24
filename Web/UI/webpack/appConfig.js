module.exports = appName => {
	switch (appName) {
		case 'projects':
			return {
				port: '44332',
				apiPort: '44384',
				title: 'Projects',
				pathBase: '/projects/',
				additionalScripts: ['https://connectors.tableau.com/libs/tableauwdc-2.3.latest.js'],
			};
		case 'proposals':
			return {
				port: '44331',
				apiPort: '44385',
				title: 'Proposals',
				pathBase: '/proposals/',
				additionalScripts: ['/proposals/dist/textLimits.js'],
			};
		case 'sso':
			return {
				port: '44330',
				apiPort: '44382',
				title: 'SSO',
				pathBase: '/',
				additionalScripts: [],
			};
	}
};
