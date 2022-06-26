const path = require('path');
const sass = require('sass');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require(path.resolve(__dirname, `../src/assets/json/config.json`));

const environment = process.env.NODE_ENV;
const isDev = environment === 'development';
const manifestVersions = ['2', '3'];

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
const buildCopyPatterns = (paths) => {
	const results = [];

	manifestVersions.forEach(version => {
		paths.forEach(dir => {
			results.push(
				{
					from: path.resolve(__dirname, `../${dir}`),
					to: path.resolve(__dirname, `../dist/v${version}/${dir}`),
				},
			);
		});

		results.push(
			{
				from: path.resolve(__dirname, `../src/manifest.v${version}.json`),
				to: path.resolve(__dirname, `../dist/v${version}/src/manifest.json`),
			},
		)
	});

	return results;
};

const copyConfig = {
	patterns: buildCopyPatterns(['src/assets/images', 'src/_locales']),
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
const buildHtmlWebpackPlugin = (pages) => {
	const results = [];

	manifestVersions.forEach(version => {
		pages.forEach(page => {
			results.push(new HtmlWebpackPlugin({
				template: path.resolve(__dirname, `../src/pages/${page}.html`),
				filename: `v${version}/src/pages/${page}.html`,
				inject: false,
				minify: !isDev,
				scriptLoading: 'defer',
				files: {
					head: {
						css: '../assets/css/main.min.css',
					},
					body: {
						js: [`../assets/js/${page}.min.js`, '../assets/js/locale.min.js']
					},
					icons: config.icons,
				},
			}));
		});
	});

	return results;
};

/*
 |--------------------------------------------------------------------------
 | Clean Options
 |--------------------------------------------------------------------------
 */
const buildCleanMainOptions = () => {
	const results = [];

	manifestVersions.forEach(version => {
		results.push(path.join(__dirname, `../dist/v${version}/src/assets/css/main.min.js`));
	});

	return results;
};

const cleanOptions = {
	dry: false,
	verbose: false,
	cleanOnceBeforeBuildPatterns: [
		path.join(__dirname, '../dist'),
	],
	cleanAfterEveryBuildPatterns: buildCleanMainOptions(),
};


const buildMiniCssExtractPlugin = () => {
	const results = [];

	manifestVersions.forEach(version => {
		results.push(new MiniCssExtractPlugin({
			filename: `v${version}/src/assets/css/main.min.css`,
		}));
	});

	return results;
};

/*
 |--------------------------------------------------------------------------
 | Plugins
 |--------------------------------------------------------------------------
 */
const plugins = [
	new CleanWebpackPlugin(cleanOptions),
	new CopyPlugin(copyConfig),
	...buildMiniCssExtractPlugin(),
	...buildHtmlWebpackPlugin(['about', 'popup']),
];

/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
*/
const buildWebpackEntries = () => {
	const results = {};
	const assets = {
		paths: {
			about: 'src/assets/js/about',
			background: 'src/assets/js/background',
			content: 'src/assets/js/content',
			locale: 'src/assets/js/locale',
			popup: 'src/assets/js/popup',
			main: 'src/assets/css/main',
		},
		files: {
			about: path.resolve(__dirname, '../src/assets/js/about.js'),
			background: path.resolve(__dirname, '../src/assets/js/background.js'),
			content: path.resolve(__dirname, '../src/assets/js/content.js'),
			locale: path.resolve(__dirname, '../src/assets/js/locale.js'),
			popup: path.resolve(__dirname, '../src/assets/js/popup.js'),
			main: path.resolve(__dirname, '../src/assets/scss/main.scss'),
		}
	};

	manifestVersions.forEach(version => {
		results[`v${version}/${assets.paths.about}`] = assets.files.about;
		results[`v${version}/${assets.paths.background}`] = assets.files.background;
		results[`v${version}/${assets.paths.content}`] = assets.files.content;
		results[`v${version}/${assets.paths.locale}`] = assets.files.locale;
		results[`v${version}/${assets.paths.popup}`] = assets.files.popup;
		results[`v${version}/${assets.paths.main}`] = assets.files.main;
	});

	return results;
}


module.exports = {
	mode: environment,
	entry: buildWebpackEntries(),
	output: {
		filename: '[name].min.js',
		path: path.resolve(__dirname, `../dist`),
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
