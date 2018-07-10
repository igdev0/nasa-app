const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HotModuleReplacementPlugin = require('webpack-hot-middleware');
const path = require('path');

const config = {
	mode: process.env.NODE_ENV || 'development',
	entry: ['babel-polyfill', './app/app.js'],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: '/node_modules/',
				use: {
					loader: 'babel-loader'
				}
			},

			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'less-loader'
				]
			}
		]
	},

	plugins: [
		new MiniCssExtractPlugin({
			name: '[name].css',
			chunkFilename: '[id].css'
		}),

		new webpack.HotModuleReplacementPlugin()
	]
};

module.exports = config;