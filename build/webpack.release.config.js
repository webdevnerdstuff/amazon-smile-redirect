const base = require('./webpack.base.config');
const packageJson = require('../package.json');
const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");
const FileManagerPlugin = require('filemanager-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');

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
| Copy Plugin Config
|--------------------------------------------------------------------------
*/
const copyConfig = {
	patterns: [
		{
			from: path.resolve(__dirname, `../build`),
			to: path.resolve(__dirname, `../zip-build/build`),
		},
		{
			from: path.resolve(__dirname, `../docs/firefox`),
			to: path.resolve(__dirname, `../zip-build/docs/firefox`),
		},
		{
			from: path.resolve(__dirname, `../src`),
			to: path.resolve(__dirname, `../zip-build/src`),
		},
		{
			from: path.resolve(__dirname, `../.*`),
			to: path.resolve(__dirname, `../zip-build`),
		},
		{
			from: path.resolve(__dirname, `../*.js`),
			to: path.resolve(__dirname, `../zip-build`),
		},
		{
			from: path.resolve(__dirname, `../*.json`),
			to: path.resolve(__dirname, `../zip-build`),
		},
		{
			from: path.resolve(__dirname, `../*.yaml`),
			to: path.resolve(__dirname, `../zip-build`),
		},
	],
};

/*
|--------------------------------------------------------------------------
| ZIP files
|--------------------------------------------------------------------------
*/
const chromiumZip = {
	events: {
		onEnd: {
			archive: [
				{
					source: path.resolve(__dirname, '../dist'),
					destination: path.resolve(__dirname, '../published/chromium_extension.zip'),
				},
			],
		},
	},
}

const firefoxZip = {
	events: {
		onEnd: {
			archive: [
				{
					source: path.resolve(__dirname, '../dist/src'),
					destination: path.resolve(__dirname, '../published/firefox_extension.zip'),
				},
			],
		},
	},
}

const firefoxSourceCodeZip = {
	events: {
		onEnd: [
			{
				archive: [
					{
						source: path.resolve(__dirname, '../zip-build'),
						destination: path.resolve(__dirname, '../published/firefox_source_code.zip'),
						options: {
							globOptions: {
								dot: true,
							},
							gzip: true,
						},
					},
				],
			},
			{
				delete: [path.join(__dirname, '../zip-build')],
			},
		],
	},
}

/*
 |--------------------------------------------------------------------------
 | Clean Options
 |--------------------------------------------------------------------------
 */
const cleanPublishedOptions = {
	cleanOnceBeforeBuildPatterns: [
		path.join(__dirname, '../published'),
	],
	dry: false,
	verbose: false,
};


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
	plugins: [
		new CleanWebpackPlugin(cleanPublishedOptions),
		new webpack.BannerPlugin({
			banner,
		}),
		new CopyPlugin(copyConfig),
		new FileManagerPlugin(chromiumZip),
		new FileManagerPlugin(firefoxZip),
		new FileManagerPlugin(firefoxSourceCodeZip),
	],
});
