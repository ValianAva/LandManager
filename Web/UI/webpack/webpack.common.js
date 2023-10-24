/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const commonPaths = require('./paths');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const appConfig = require('./appConfig');

module.exports = env => {
	const appPath = commonPaths.srcPath(env.app);
	const lowerEnv = env.app.toLowerCase();
	const config = appConfig(lowerEnv);

	const isProduction = () => process.env.NODE_ENV === 'production';

	return {
		entry: `${appPath}/index.tsx`,
		output: {
			filename: commonPaths.outputName,
			publicPath: `${config.pathBase}dist/`,
		},
		module: {
			rules: [
				{
					test: /\.(js|mjs|jsx|ts|tsx)$/,
					loader: 'babel-loader',
					options: {
						cacheDirectory: '.npm-cache/babel-loader',
					},
					include: [commonPaths.srcPath('')],
				},
				//Just copy img files to dist/img.
				{
					test: /\.(png|jpg|gif|svg)$/,
					include: commonPaths.srcPath(''),
					type: 'asset/resource',
					generator: {
						filename: `${commonPaths.imagesFolder}/[name][ext]`,
					},
				},

				//Just copy font files to font folder.
				{
					test: /\.(woff2|ttf|woff|eot)$/,
					include: commonPaths.srcPath(''),
					type: 'asset/resource',
					generator: {
						filename: `${commonPaths.fontsFolder}/[name][ext]`,
					},
				},
				//Copy office files to dist/static-files.
				{
					test: /\.(pdf|docx|xls|xlsx)$/,
					include: [commonPaths.srcPath('Common'), appPath],
					type: 'asset/resource',
					generator: {
						filename: `${commonPaths.staticFilesFolder}/[name][ext]`,
					},
				},
			],
		},
		resolve: {
			modules: [commonPaths.srcPath(''), 'node_modules'],
			extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
		},
		plugins: [
			new ForkTsCheckerWebpackPlugin({
				typescript: { configFile: `${appPath}/tsconfig.json` },
			}),
			new CopyWebpackPlugin({
				//just copy the oidc-client so it can be used as-is in the separate callback page
				//https://github.com/IdentityModel/oidc-client-js/issues/250#issuecomment-282586322
				patterns: [
					{ from: './node_modules/oidc-client-ts/dist/browser/oidc-client-ts.js', to: 'oidc-client.js' },
					{ from: `${appPath}/labels.js`, noErrorOnMissing: true },
					{ from: `${appPath}/textLimits.js`, noErrorOnMissing: true },
					{ from: `${commonPaths.srcPath('Common')}/wwwroot/favicon.ico`, to: '../favicon.ico' },
				],
			}),
			new HtmlWebpackPlugin({
				title: config.title,
				base: config.pathBase,
				filename: '../index.html',
				template: `${commonPaths.srcPath('Common')}/wwwroot/index-template.html`,
				apiRoot: isProduction() ? 'api' : `https://localhost:${config.apiPort}`,
				additionalScripts: config.additionalScripts,
			}),
			new HtmlWebpackPlugin({
				title: 'Completing Login Process',
				filename: '../login-callback.html',
				template: `${commonPaths.srcPath('Common')}/wwwroot/login-callback-template.html`,
				apiRoot: isProduction() ? 'api' : `https://localhost:${config.apiPort}`,
				inject: false, // we already have all dependencies. don't need bundle.min.js
			}),
			new HtmlWebpackPlugin({
				title: 'Completing Logout Process',
				filename: '../logout.html',
				template: `${commonPaths.srcPath('Common')}/wwwroot/logout-template.html`,
				apiRoot: isProduction() ? 'api' : `https://localhost:${config.apiPort}`,
				inject: false, // we already have all dependencies. don't need bundle.min.js
			}),
			new HtmlWebpackPlugin({
				title: '',
				filename: '../silent-renew.html',
				template: `${commonPaths.srcPath('Common')}/wwwroot/silent-renew-template.html`,
				apiRoot: isProduction() ? 'api' : `https://localhost:${config.apiPort}`,
				inject: false, // we already have all dependencies. don't need bundle.min.js
			}),
		],

		//https://www.typescriptlang.org/docs/handbook/react-&-webpack.html
		externals: {
			settings: 'settings',
			labels: 'labels',
			tableau: 'tableau',
			textLimits: 'textLimits',
		},
	};
};
