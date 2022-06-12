const TerserPlugin = require('terser-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const base = require('./webpack.base.config');
const packageJson = require('../package.json');
const path = require('path');

/*
 |--------------------------------------------------------------------------
 | Banner
 |--------------------------------------------------------------------------
 */
let packageName = packageJson.name;
packageName = packageName.split('-');

packageName.forEach((val, key) => {
	packageName[key] = val.toLowerCase()
		.split('-')
		.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
		.join(' ');
});

packageName = packageName.join(' ');

const banner = `${packageName}

 @name ${packageJson.name}
 @version ${packageJson.version}
 @description ${packageJson.description}
 @author ${packageJson.author}
 @copyright Copyright ${new Date().getFullYear()}, WebDevNerdStuff
 @homepage ${packageJson.homepage}
 @repository ${packageJson.repository}
 @license https://github.com/webdevnerdstuff/${packageJson.name}/blob/main/LICENSE.md
 `;

/*
|--------------------------------------------------------------------------
| ZIP files
|--------------------------------------------------------------------------
*/
const chromeZip = {
	events: {
		onEnd: {
			archive: [
				{
					source:  path.resolve(__dirname, '../dist'),
					destination: path.resolve(__dirname, '../published/chrome_extensions.zip'),
				},
			],
		},
	},
}

/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
*/
module.exports = merge(base, {
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				extractComments: false,
			}),
		],
	},
	// * Add if needed //
	// performance: {
	// 	hints: false,
	// 	maxEntrypointSize: 512000,
	// 	maxAssetSize: 512000,
	// },
	plugins: [
		new webpack.BannerPlugin({
			banner,
		}),
		new FileManagerPlugin(chromeZip),
	],
});
