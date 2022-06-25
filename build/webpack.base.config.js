const path = require('path');
const sass = require('sass');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require(path.resolve(__dirname, `../src/assets/json/config.json`));
// const packageJson = require('../package.json');

const environment = process.env.NODE_ENV;
const isDev = environment === 'development';
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
 | HtmlWebpackPlugin Options
 |--------------------------------------------------------------------------
 */
const aboutHtml = path.resolve(__dirname, '../src/pages/about.html');
const popupHtml = path.resolve(__dirname, '../src/pages/popup.html');

const aboutConfig = {
	template: aboutHtml,
	inject: false,
	minify: false,
	minify: !isDev,
	scriptLoading: 'defer',
	filename: 'pages/about.html',
	files: {
		head: {
			css: '../assets/css/main.min.css',
		},
		body: {
			js: ['../assets/js/about.min.js', '../assets/js/locale.min.js']
		},
	},
};

const popupConfig = {
	template: popupHtml,
	inject: false,
	minify: false,
	minify: !isDev,
	scriptLoading: 'defer',
	filename: 'pages/popup.html',
	files: {
		head: {
			css: '../assets/css/main.min.css',
		},
		body: {
			js: ['../assets/js/popup.min.js', '../assets/js/locale.min.js']
		},
		icons: config.icons,
	},
};

/*
 |--------------------------------------------------------------------------
 | Clean Options
 |--------------------------------------------------------------------------
 */
const cleanOptions = {
	dry: false,
	verbose: false,
	cleanOnceBeforeBuildPatterns: [
		path.join(__dirname, '../dist'),
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
		filename: 'assets/css/main.min.css',
	}),
	new HtmlWebpackPlugin(aboutConfig),
	new HtmlWebpackPlugin(popupConfig),
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
		locale: path.resolve(__dirname, '../src/assets/js/locale.js'),
		popup: path.resolve(__dirname, '../src/assets/js/popup.js'),
		main: path.resolve(__dirname, '../src/assets/scss/main.scss'),
	},
	output: {
		filename: 'assets/js/[name].min.js',
		path: path.resolve(__dirname, `../${distDir}/src`),
	},
	watchOptions: {
		poll: true,
		ignored: /node_modules/
	},
	// Resolve done //
	resolve: {
		extensions: ['.js', '.scss', '.css'],
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
