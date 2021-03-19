const path = require('path');
const sass = require('node-sass');

module.exports = grunt => {
	require('load-grunt-tasks')(grunt);


	// ---------------------------------------------------- REQUIRE PAGE SCRIPTS FILE - DONE //
	let env;

	// ---------------------------------------------------- FILE INFO BUILDER //
	const fileInfoBuilder = filePath => {
		const fileInfo = path.parse(filePath);

		// Set compiling file paths //
		const tempFile = `_temp/${fileInfo.dir}/${fileInfo.name}.min${fileInfo.ext}`;
		let outgoingFile = `src/${fileInfo.dir}/${fileInfo.name}.min${fileInfo.ext}`;

		// Remove "default" from end of file name //
		if (tempFile.substring(tempFile.lastIndexOf('-') + 1) === 'default.min.js') {
			outgoingFile = `${outgoingFile.substring(0, outgoingFile.lastIndexOf('-') + 0)}.min.js`;
		}

		fileInfo.tempFile = tempFile;
		fileInfo.outgoingFile = outgoingFile;

		return fileInfo;
	};

	// ---------------------------------------------------- INIT TASK //
	grunt.registerTask('init', 'Starting Tasks', () => {
		env = grunt.option('env');
		const sourceMaps = env === 'default' || env === 'dev' || false;

		grunt.option('sourceMaps', sourceMaps);

		// Check for environment //
		if (env === 'dev' || !env) {
			grunt.task.run(['buildAssets', 'watch']);
		}
		else if (env === 'build' || env === 'build-crx' || env === 'build-firefox') {
			grunt.task.run(['buildAssets']);
		}
		else if (env === 'default' || env === 'lint') {
			grunt.task.run(['watch']);
		}
		else {
			grunt.task.run(['watch']);
		}

		// Set PostCss map option based on build //
		function postCssMap() {
			let map = false;

			if (grunt.option('sourceMaps')) {
				map = {
					inline: false,
					sourcesContent: true,
					prev: 'extension/src/assets/css/main.min.css.map',
					annotation: 'extension/src/assets/css/',
				};
			}

			return map;
		}

		// ---------------------------------------------------- GRUNT INIT CONFIG //
		grunt.initConfig({
			pkg: grunt.file.readJSON('package.json'),
			// ---------------------------------------------------- CLEAN //
			clean: {
				temp: {
					src: [
						'_temp/**/*',
						'!_temp/.gitignore',
					],
				},
				assets: {
					src: [
						'extension/src/assets/js',
						'extension/src/assets/css',
						'extension/src/assets/vendor',
					],
				},
				dist: {
					src: [
						'dist/**/*',
						'!dist/.gitignore',
					],
				},
			},
			// ---------------------------------------------------- COPY //
			copy: {
				fontawesome_fonts: {
					files: [
						{
							expand: true,
							cwd: 'node_modules/@fortawesome/fontawesome-free/webfonts/',
							src: '**',
							dest: 'extension/src/assets/vendor/fontawesome/',
						},
					],
				},
				fontawesome_js: {
					files: [
						{
							expand: true,
							cwd: 'node_modules/@fortawesome/fontawesome-free/js/',
							src: 'all.min.js',
							dest: 'extension/src/assets/vendor/fontawesome/js/',
						},
					],
				},
			},
			// ==================================================== JAVASCRIPT TASKS //
			// ---------------------------------------------------- BABEL //
			babel: {
				options: {
					comments: false,
					sourceMap: grunt.option('sourceMaps') === true || false,
					presets: ['@babel/preset-env'],
				},
				dist: {
					files: {
						'<%= tempFile %>': '<%= filePath %>',
					},
				},
				all: {
					expand: true,
					cwd: 'assets/js/',
					src: ['**/*.js'],
					ext: '.min.js',
					dest: '_temp/assets/js',
				},
			},
			// ---------------------------------------------------- ESLINT - DONE //
			eslint: {
				options: {
					configFile: '.eslintrc.js',
					maxWarnings: 50,
					fix: grunt.option('fix'),
				},
				all: ['<%= watch.javascript.files %>'],
				newerFiles: ['<%= filePath %>'],
			},
			// ---------------------------------------------------- UGLIFY //
			uglify: {
				options: {
					beautify: grunt.option('sourceMaps') || false,
					mangle: grunt.option('sourceMaps') !== true || false,
					sourceMap: grunt.option('sourceMaps') || false,
					sourceMapIncludeSources: grunt.option('sourceMaps') || false,
				},
				all: {
					options: {
						sourceMap: grunt.option('sourceMaps') || false,
					},
					files: [
						{
							expand: true,
							cwd: './_temp/assets/js',
							src: '**/*.js',
							ext: '.min.js',
							dest: 'extension/src/assets/js',
						},
					],
				},
				dist: {
					options: {
						sourceMap: {
							includeSources: grunt.option('sourceMaps') || false,
						},
						sourceMapIn: '<%= tempFile %>.map',
						sourceMapName: '<%= outgoingFile %>.map',
					},
					files: {
						'<%= outgoingFile %>': ['<%= tempFile %>'],
					},
				},
			},
			// ==================================================== STYLE TASKS //
			// ---------------------------------------------------- SASS //
			sass: {
				dev: {
					options: {
						implementation: sass,
						precision: 10,
						sourceMap: grunt.option('sourceMaps') || false,
						sourceMapContents: grunt.option('sourceMaps') || false,
						outFile: 'extension/src/assets/css/main.min.css.map',
						outputStyle: grunt.option('sourceMaps') ? 'expanded' : 'compressed',
					},
					files: [
						{
							expand: true,
							cwd: 'assets/scss',
							src: 'main.scss',
							dest: 'extension/src/assets/css',
							ext: '.min.css',
						},
					],
				},
			},
			// ---------------------------------------------------- STYLELINT //
			stylelint: {
				options: {
					configFile: 'stylelint.config.js',
					formatter: 'string',
					ignoreDisables: false,
					failOnError: true,
					reportNeedlessDisables: false,
					syntax: '',
				},
				all: [
					'assets/scss/**/*.scss',
					'assets/vendor/**/*.scss',
				],
				newerFiles: ['<%= filePath %>'],
			},
			// ---------------------------------------------------- POSTCSS //
			postcss: {
				options: {
					processors: [
						require('autoprefixer')({
							config: '.browserslistrc',
						}),
					],
					map: postCssMap(),
				},
				dist: {
					src: 'extension/src/assets/css/main.min.css',
				},
			},
			// ---------------------------------------------------- WATCH //
			watch: {
				options: {
					livereload: grunt.option('livereload') || false,
					spawn: false,
				},
				javascript: {
					files: ['assets/js/**/*.js'],
				},
				scss: {
					files: ['assets/**/*.scss'],
				},
			},
			// ---------------------------------------------------- EXTENSION ZIPS //
			compress: {
				chrome_ext: {
					options: {
						archive: 'dist/chrome_extension.zip',
					},
					files: [
						{
							expand: true,
							cwd: 'extension/',
							src: ['**'],
							dest: '/',
						},
					],
				},
				firefox_ext: {
					options: {
						archive: 'dist/firefox_extension.zip',
					},
					files: [
						{
							expand: true,
							cwd: 'extension/src',
							src: ['**'],
							dest: '/',
						},
					],
				},
				firefox_source_code: {
					options: {
						archive: 'dist/firefox_source_code.zip',
					},
					files: [
						{
							expand: true,
							cwd: '.',
							src: [
								'_temp',
								'!_temp/**/*',
								'!_temp/.gitignore',
								'assets/**',
								'dist',
								'!dist/**/*',
								'!dist/.gitignore',
								'docs/firefox-developer-build-instructions.md',
								'extension/**',
								'.babelrc',
								'.browserslistrc',
								'.eslintrc.js',
								'Gruntfile.js',
								'LICENSE',
								'README.md',
								'package-lock.json',
								'package.json',
								'stylelint.config.js',
							],
							dest: '/',
						},
					],
				},
			},
			// ---------------------------------------------------- EXTENSION CRX //
			crx: {
				mySignedExtension: {
					src: 'extension/src/**/*',
					dest: 'dist/asr.crx',
				},
				options: {
					privateKey: 'amazon-smile-redirect.pem',
				},
			},
		});

		// ---------------------------------------------------- WATCH EVENTS JS/SCSS //
		grunt.event.on('watch', (action, filePath, task) => {
			const lintOnly = env === 'lint';

			const fileInfo = fileInfoBuilder(filePath);
			grunt.config.set('filePath', filePath);

			// Run JS Tasks //
			if (fileInfo.ext === '.js' && task !== 'javascript_plugins') {
				const newFilePath = `extension/src/${fileInfo.dir}/${fileInfo.name}.min${fileInfo.ext}`;

				grunt.config.set('tempFile', newFilePath);
				grunt.config.set('outgoingFile', newFilePath);

				grunt.task.run(['clean:temp', 'eslint:newerFiles', 'babel:dist', 'uglify:dist', 'clean:temp']);
			}
			else if (fileInfo.ext === '.scss') {
				// -------------------------- Run SCSS Tasks //

				// main.scss //
				if (fileInfo.name === 'main' && !lintOnly) {
					grunt.task.run('sass:dev', 'postcss', 'stylelint:all');
				}
				else if (fileInfo.name === 'main') {
					grunt.task.run('stylelint:all');
				}
				else {
					// **/*.scss //
					if (!lintOnly) {
						grunt.task.run('sass:dev', 'postcss');
					}

					grunt.task.run(['stylelint:newerFiles']);
				}
			}

			return false;
		});
	});

	// ---------------------------------------------------- BUILD ASSETS TASKS //
	grunt.registerTask('buildAssets', 'Build Assets', () => {
		grunt.log.writeln('\r');
		grunt.log.writeln('==========================================='.green.bold);
		grunt.log.writeln('Building page assets.'.green.bold);
		grunt.log.writeln('==========================================='.green.bold);

		const sourceMaps =
			grunt.option('env') === 'default' ||
			grunt.option('env') === 'dev' ||
			grunt.option('env') === 'build' ||
			grunt.option('env') === 'build-crx' ||
			grunt.option('env') === 'build-firefox' ||
			false;

		grunt.option('sourceMaps', sourceMaps);

		// Run Tasks //
		grunt.task.run([
			'clean',
			'copy:fontawesome_fonts',
			'copy:fontawesome_js',
			'babel:all',
			'uglify:all',
			'sass:dev',
			'postcss',
			'clean:temp',
		]);

		if (grunt.option('env') === 'build') {
			grunt.task.run(['compress']);
		}
		else if (grunt.option('env') === 'build-crx') {
			grunt.task.run(['compress', 'crx']);
		}
		else if (grunt.option('env') === 'build-firefox') {
			grunt.task.run(['compress:firefox_ext', 'compress:firefox_source_code']);
		}

		return true;
	});

	// ---------------------------------------------------- LOAD TASKS //
	grunt.loadNpmTasks('gruntify-eslint');

	// ---------------------------------------------------- MAIN TASKS //
	// Run Watch Task //
	grunt.registerTask('default', 'Default Task', () => {
		grunt.option('env', 'default');
		grunt.option('livereload', grunt.option('livereload') !== false || false);
		grunt.task.run('init');
	});

	// Build all assets and run Watch Task //
	grunt.registerTask('dev', 'Dev Environment', () => {
		grunt.option('env', 'dev');
		grunt.option('livereload', grunt.option('livereload') !== false || false);
		grunt.task.run('init');
	});

	// Build all assets w/CRX //
	grunt.registerTask('build-crx', 'Build Task w/CRX', () => {
		grunt.option('env', 'build-crx');
		grunt.task.run('init');
	});

	// Build all assets w/CRX //
	grunt.registerTask('build-firefox', 'Build Task for Firefox', () => {
		grunt.option('env', 'build-firefox');
		grunt.task.run('init');
	});

	// Build all assets //
	grunt.registerTask('build', 'Build Task', () => {
		grunt.option('env', 'build');
		grunt.task.run('init');
	});
};
