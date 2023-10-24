/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const commonPaths = require('./paths');
const appConfig = require('./appConfig');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const getDevConfig = env => {
	// turns out webpack-dev-server may not have liked having the app names capitalized for publicPath and url
	const lowerEnv = env.app.toLowerCase();
	const config = appConfig(lowerEnv);

	return new SpeedMeasurePlugin().wrap({
		devtool: 'source-map',
		mode: 'development',
		output: {
			path: commonPaths.outputPath(env.app),
			chunkFilename: '[name].js',
		},
		devServer: {
			static: {
				directory: commonPaths.wwwRoot(env.app),
				publicPath: config.pathBase,
			},
			historyApiFallback: {
				index: `${config.pathBase}index.html`,
			},
			hot: true,
			server: 'https',
			port: config.port,
			open: config.pathBase,
			client: {
				logging: 'verbose',
			},
			webSocketServer: 'ws',
		},
		module: {
			rules: [
				{
					test: /\.(css)$/,
					include: [commonPaths.srcPath(''), commonPaths.nodeModules('tinymce')],
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
								modules: {
									localIdentName: '[local]',
								},
							},
						},
					],
				},
			],
		},
		plugins: [new BundleAnalyzerPlugin({ analyzerMode: 'disabled', openAnalyzer: false })],
	});
};

module.exports = env => {
	return merge(common(env), getDevConfig(env));
};
