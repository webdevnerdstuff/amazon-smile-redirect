const path = require('path');
const sass = require('sass');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const packageJson = require('../package.json');

const environment = process.env.NODE_ENV;
const distDir = 'dist';

/*
 |--------------------------------------------------------------------------
 | Styles Rule
 | (Vue Style Loader, CSS Loader, SASS Loader)
 |--------------------------------------------------------------------------
 */
const stylesRule = {
	rules: [
		{
			test: /\.s[ac]ss$/i,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				{
					loader: 'sass-loader',
					options: {
						implementation: sass,
					},
				},
			],
		},
	],
};

/*
 |--------------------------------------------------------------------------
 | JavaScript Babel Loader Rule
 |--------------------------------------------------------------------------
 */
const jsRule = {
	test: /\.js$/,
	use: {
		loader: 'babel-loader',
		options: {
			presets: ['@babel/preset-env'],
		},
	},
	exclude: /node_modules/,
};

/*
 |--------------------------------------------------------------------------
 | Copy Plugin Config
 |--------------------------------------------------------------------------
 */
const copyConfig = {
	patterns: [
		{
			from: path.resolve(__dirname, `../src/assets/images`),
			to: path.resolve(__dirname, `../${distDir}/src/assets/images`),
		},
		{
			from: path.resolve(__dirname, `../src/_locales`),
			to: path.resolve(__dirname, `../${distDir}/src/_locales`),
		},
		{
			from: path.resolve(__dirname, `../src/pages`),
			to: path.resolve(__dirname, `../${distDir}/src/pages`),
		},
		{
			from: path.resolve(__dirname, `../src/manifest.json`),
			to: path.resolve(__dirname, `../${distDir}/src`),
		},
	],
};

/*
 |--------------------------------------------------------------------------
 | SVG Inline Loader Rule
 |--------------------------------------------------------------------------
 */
const svgRule = {
	rules: [
		{
			test: /\.svg$/,
			loader: 'svg-inline-loader',
		},
	],
};

/*
 |--------------------------------------------------------------------------
 | Clean Options
 |--------------------------------------------------------------------------
 */
const cleanOptions = {
	root: distDir,
	dry: false,
	verbose: false,
	cleanOnceBeforeBuildPatterns: [
		'**/*.js',
		'**/*.css',
		'**/*.png',
		'**/*.json',
		'**/*.html',
	],
};

/*
 |--------------------------------------------------------------------------
 | Plugins
 |--------------------------------------------------------------------------
 */
const plugins = [
	new CleanWebpackPlugin(cleanOptions),
	new CopyPlugin(copyConfig),
	new MiniCssExtractPlugin({
		// Options similar to the same options in webpackOptions.output
		// both options are optional
		filename: 'css/main.min.css',
	}),
];

/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
*/
module.exports = {
	mode: environment,
	entry: {
		about: path.resolve(__dirname, '../src/assets/js/about.js'),
		background: path.resolve(__dirname, '../src/assets/js/background.js'),
		content: path.resolve(__dirname, '../src/assets/js/content.js'),
		icons: path.resolve(__dirname, '../src/assets/js/icons.js'),
		locale: path.resolve(__dirname, '../src/assets/js/locale.js'),
		popup: path.resolve(__dirname, '../src/assets/js/popup.js'),
		main: path.resolve(__dirname, '../src/assets/scss/main.scss'),
	},
	output: {
		filename: 'js/[name].min.js',
		// library: packageJson.name,
		// libraryTarget: 'commonjs',
		path: path.resolve(__dirname, `../${distDir}/src/assets`),
	},
	watchOptions: {
		poll: true,
		ignored: /node_modules/
	},
	// Resolve done //
	resolve: {
		extensions: ['.js'],
	},
	module: {
		rules: [
			jsRule,
			stylesRule,
			svgRule,
		],
	},
	plugins,
	infrastructureLogging: {
		level: 'none',
	},
};
