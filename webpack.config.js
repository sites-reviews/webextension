const path = require('path');
const SizePlugin = require('size-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	stats: 'errors-only',
	entry: {
		background: './source/background',
		content_scripts: './source/content_scripts',
		site: './source/site',
		'hot-reload': './source/hot-reload'
	},
	output: {
		path: path.join(__dirname, 'distribution'),
		filename: '[name].js'
	},
	plugins: [
		new SizePlugin(),
		new CopyWebpackPlugin([
			{
				from: '**/*',
				context: 'source',
				ignore: ['*.js']
			},
			{
				from: 'node_modules/webextension-polyfill/dist/browser-polyfill.min.js'
			}
		])
	],
	optimization: {
		minimizer: [
			new TerserPlugin({
				extractComments: {
					condition: 'some',
					filename: (fileData) => {
						// The "fileData" argument contains object with "filename", "basename", "query" and "hash"
						return `${fileData.filename}.LICENSE.txt${fileData.query}`;
					},
					banner: (licenseFile) => {
						return `License information can be found in ${licenseFile}`;
					},
				},
				cache: true,
				parallel: true,
				sourceMap: true, // Must be set to true if using source-maps in production
				terserOptions: {
					mangle: true,
					extractComments: 'all',
					compress: {
						drop_console: true,
					},
					output: {
						beautify: false,
						indent_level: 2 // eslint-disable-line camelcase
					}
				}
			})
		]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
};
