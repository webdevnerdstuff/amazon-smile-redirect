const base = require('./webpack.base.config');
const packageJson = require('../package.json');
const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");
const FileManagerPlugin = require('filemanager-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');

const zipBuildDir = '../zip-build';

// TODO: Need to delete the main.js.min from css before zip files created //

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
const buildCopyPatterns = (paths) => {
	const results = [];

	paths.forEach(dir => {
		const outputDir = dir.includes('*') ? '' : dir;

		results.push({
			from: path.resolve(__dirname, `../${dir}`),
			to: path.resolve(__dirname, `${zipBuildDir}/${outputDir}`),
		})
	});

	return results;
};

const copyPatterns = buildCopyPatterns(['build', 'docs/firefox', 'src', '.*', '*.js', '*.json', '*.yaml']);
const copyConfig = { patterns: copyPatterns };

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
					source: path.resolve(__dirname, '../dist/v3'),
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
					source: path.resolve(__dirname, '../dist/v2/src'),
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
						source: path.resolve(__dirname, zipBuildDir),
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
				delete: [path.join(__dirname, zipBuildDir)],
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
