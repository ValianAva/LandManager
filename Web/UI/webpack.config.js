/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const common = require('./webpack/webpack.common');
const { merge } = require('webpack-merge');

const envs = {
	development: 'dev',
	production: 'prod',
};

const envConfig = require(`./webpack/webpack.${envs[process.env.NODE_ENV || 'development']}.js`);
module.exports = env => merge(common(env), envConfig(env));
