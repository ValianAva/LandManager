/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

module.exports = {
	root: path.resolve(__dirname, '../'),
	outputPath: app => path.resolve(__dirname, '../', `wwwroot/${app}/dist`),
	outputName: 'bundle.min.js',
	wwwRoot: app => path.resolve(__dirname, '../', `wwwroot/${app}`),
	srcPath: app => path.resolve(__dirname, '../', 'src', app),
	imagesFolder: 'img',
	fontsFolder: 'fonts',
	cssFolder: 'css',
	configFolder: 'settings',
	staticFilesFolder: 'static-files',
	nodeModules: subPath => path.resolve(__dirname, '../', 'node_modules', subPath),
};
