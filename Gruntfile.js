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
    const sourceMaps = env === 'default' || env === 'dev' || env === 'build' || false;

    grunt.option('sourceMaps', sourceMaps);

    // Check for environment //
    if (env === 'dev' || !env) {
      grunt.task.run(['buildAssets', 'watch']);
    }
    else if (env === 'build') {
      grunt.task.run(['buildAssets']);
    }
		else if (env === 'default' || env === 'lint') {
			grunt.task.run(['watch']);
		}
    else {
      grunt.task.run(['watch']);
    }

    // ---------------------------------------------------- GRUNT INIT CONFIG //
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      // ---------------------------------------------------- CLEAN //
      clean: {
        temp: {
          src: ['_temp'],
        },
        assets: {
          src: [
            'chrome/src/assets/js',
            'chrome/src/assets/css',
            'chrome/src/assets/vendor',
          ],
        },
      },
      // ---------------------------------------------------- COPY //
      copy: {
        fontawesome: {
          files: [
            {
              expand: true,
              cwd: 'node_modules/@fortawesome/fontawesome-free/',
              src: '**',
              dest: 'chrome/src/assets/vendor/fontawesome/',
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
              dest: 'chrome/src/assets/js',
            },
          ],
        },
        dist: {
          options: {
            sourceMap: {
              includeSources: grunt.option('sourceMaps') || false,
            },
            mangle: true,
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
            sourceMap: true,
            sourceMapContents: true,
            outFile: 'chrome/src/assets/css/main.min.css.map',
            outputStyle: 'compressed',
          },
          files: [
            {
              expand: true,
              cwd: 'assets/scss',
              src: 'main.scss',
              dest: 'chrome/src/assets/css',
              ext: '.min.css',
            },
          ],
        },
      },
      // ---------------------------------------------------- SASS-LINT //
      sasslint: {
        options: {
          configFile: '.sass-lint.yml',
          formatter: 'stylish',
        },
        allFiles: [
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
          map: {
            inline: false,
            sourcesContent: true,
            prev: 'chrome/src/assets/css/main.min.css.map',
            annotation: 'chrome/src/assets/css/',
          },
        },
        dist: {
          src: 'chrome/src/assets/css/main.min.css',
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
    });

    // ---------------------------------------------------- WATCH EVENTS JS/SCSS //
    grunt.event.on('watch', (action, filePath, task) => {
      const lintOnly = env === 'lint';

      const fileInfo = fileInfoBuilder(filePath);
      grunt.config.set('filePath', filePath);

      // Run JS Tasks //
      if (fileInfo.ext === '.js' && task !== 'javascript_plugins') {
        const newFilePath = `chrome/src/${fileInfo.dir}/${fileInfo.name}.min${fileInfo.ext}`;

        grunt.config.set('tempFile', newFilePath);
        grunt.config.set('outgoingFile', newFilePath);

        grunt.task.run(['clean:temp', 'eslint:newerFiles', 'babel:dist', 'uglify:dist', 'clean:temp']);
      }
      else if (fileInfo.ext === '.scss') {
        // -------------------------- Run SCSS Tasks //

				// main.scss //
				if (fileInfo.name === 'main' && !lintOnly) {
					grunt.task.run('sass:dev', 'postcss', 'sasslint:allFiles');
				}
				else if (fileInfo.name === 'main') {
					grunt.task.run('sasslint:allFiles');
				}
				else {
          // **/*.scss //
					if (!lintOnly) {
						grunt.task.run('sass:dev', 'postcss');
					}

					grunt.task.run(['sasslint:newerFiles']);
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
      false;

    grunt.option('sourceMaps', sourceMaps);

    // Run Tasks //
    grunt.task.run([
      'clean:temp',
      'clean:assets',
      'copy:fontawesome',
      'babel:all',
      'uglify:all',
      'sass:dev',
      'postcss',
      'clean:temp',
    ]);

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

  // Build all assets //
  grunt.registerTask('build', 'Build Task', () => {
    grunt.option('env', 'build');
    grunt.task.run('init');
  });
};
