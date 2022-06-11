const path = require('path');
const sass = require('sass');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
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
 | File Loader Rule
 |--------------------------------------------------------------------------
 */
const fileRule = {
	rules: [
		{
			test: /\.(png|jpe?g|gif)$/i,
			use: [
				{
					loader: 'file-loader',
					options: {
						name: path.resolve(__dirname, `../${distDir}/assets/images/[name].[ext]`),
						outputPath: 'images',
						esModule: false,
					},
				},
			],
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
	],
};

/*
 |--------------------------------------------------------------------------
 | Plugins
 |--------------------------------------------------------------------------
 */
const plugins = [
	new CleanWebpackPlugin(cleanOptions),
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
		locale: path.resolve(__dirname, '../src/assets/js/locale.js'),
		popup: path.resolve(__dirname, '../src/assets/scss/main.scss'),
	},
	output: {
		filename: 'js/[name].min.js',
		// library: packageJson.name,
		libraryTarget: 'commonjs',
		path: path.resolve(__dirname, `../${distDir}/src/assets`),
	},
	// Resolve done //
	resolve: {
		extensions: ['.js'],
	},
	module: {
		rules: [
			fileRule,
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
