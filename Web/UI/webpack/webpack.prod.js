/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonPaths = require('./paths');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const getProdConfig = env => {

	const prodConfig = new SpeedMeasurePlugin().wrap({
		mode: 'production',
		output: {			
			path: commonPaths.outputPath(''),
			chunkFilename: '[name].[chunkhash].js',
		},
		module: {
			rules: [
				{
					test: /\.(css)$/,
					use: [MiniCssExtractPlugin.loader, 'css-loader'],
				},
			],
		},

		//https://www.typescriptlang.org/docs/handbook/react-&-webpack.html
		// externals: {
		// 	react: 'React',
		// 	'react-dom': 'ReactDOM',
		// },
		devtool: 'source-map',
		optimization: {
			minimizer: [
				new TerserPlugin({
					exclude: /settings\.js/, // ignore settings file (settings.prod.js before copy) since Octopus templates mess with valid syntax
				}),
			],
		},
	});
	prodConfig.plugins.push(
		new MiniCssExtractPlugin({
			filename: `${commonPaths.cssFolder}/[name].css`,
			chunkFilename: '[id].css',
		})
	);
	return prodConfig;
};

module.exports = env => {
	return merge(common(env), getProdConfig(env));
};
