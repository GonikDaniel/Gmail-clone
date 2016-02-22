/* jshint camelcase:false */
const gulp = require('gulp');
const plug = require('gulp-load-plugins')();
const log = plug.util.log;
const env = plug.util.env;
const colors = plug.util.colors;
const gulpIf = require('gulp-if');

const del = require('del');
const remember = require('gulp-remember');
const glob = require('glob');
const b2v = require('buffer-to-vinyl');
const gulpNgConfig = require('gulp-ng-config');
const merge = require('merge-stream');
const plato = require('plato');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

const paths = require('./gulp.config.json');
const port = process.env.PORT || 7203;
const ENV = process.env.NODE_ENV || 'development';


const isProduction = (process.env.NODE_ENV === 'production');

/**
 * List the available gulp tasks
 */
gulp.task('help', plug.taskListing);


/**
 * Remove all files from the build folder
 * One way to run clean before all tasks is to run
 * from the cmd line: gulp clean && gulp build
 * @return {Stream}
 */
gulp.task('clean', function(cb) {
    log('Cleaning: ' + plug.util.colors.blue(paths.build));

    var delPaths = [].concat(paths.build, paths.report);
    del(delPaths, {force: true}, cb);
});


/**
 * 
 * Produce ENV depended config file for project
 * @return {Stream}
 * 
 */

gulp.task('make-config', function() {
    var json = JSON.stringify({
        "production": { 
            "ENV": { 
                "api": "https://gmail-clone.herokuapp.com/", 
                "development": false 
            } 
        }, 
        "development": { 
            "ENV": { 
                "api": "http://localhost:6660/", 
                "development": true 
            } 
        }
    });

  return b2v.stream(new Buffer(json), 'app.config.module.js')
    .pipe(gulpNgConfig('app.config', {
        environment: ENV,
        wrap: '(function() {\n\t\'use strict\';\n\n\t<%= module %>\n})();'
    }))
    .pipe(gulp.dest(paths.app));
});


/**
 *
 * Lint the code, create coverage report, and a visualizer
 * @return {Stream}
 *
 */
gulp.task('analyze', function() {
   log('Analyzing source with JSHint, JSCS and Plato');

   var jshint = analyzejshint([].concat(paths.js, paths.nodejs));
   var jscs = analyzejscs([].concat(paths.js, paths.nodejs));

   startPlatoVisualizer();

   return merge(jshint, jscs);
});


/**
 *
 * Create $templateCache from the html templates
 * @return {Stream}
 *
 */

gulp.task('templatecache', function() {
    log('Creating an AngularJS $templateCache');

    return gulp.src(paths.htmltemplates, {since: gulp.lastRun('templatecache')})
            .pipe(plug.minifyHtml({
                empty: true
            }))
            .pipe(plug.angularTemplatecache('js/templates.js', {
                module: 'dgGmail',
                //doesn't create new module
                standalone: false,
                // Currently supported systems: RequireJS, Browserify, ES6 and IIFE
                moduleSystem: 'IIFE',
                root: 'app/'
            }))
            .pipe(gulp.dest(paths.build));
});


/**
 *
 * Minify and bundle the app's JavaScript
 * @return {Stream}
 *
 */
gulp.task('js', gulp.series('templatecache', function() {
   log('Bundling, minifying and copying the app\'s JavaScript');

   var source = [].concat(paths.js, paths.build + 'js/templates.js');
   return gulp.src(source, {since: gulp.lastRun('js')})
            .pipe(gulpIf(!isProduction, plug.sourcemaps.init()))
            .pipe(plug.concat('app.min.js'))
            .pipe(plug.ngAnnotate({
                add: true,
                single_quotes: true
            }))
            .pipe(plug.bytediff.start())
            .pipe(plug.uglify({
                mangle: true
            }))
            .pipe(plug.bytediff.stop(bytediffFormatter))
            .pipe(gulpIf(!isProduction, plug.sourcemaps.write()))
            .pipe(gulp.dest(paths.build + 'js'));
}));


/**
 *
 * Copy the Vendor JavaScript
 * @return {Stream}
 *
 */
gulp.task('vendorjs', function() {
    log('Bundling, minifying, and copying the Vendor JS');

    return gulp.src(paths.vendorjs, {since: gulp.lastRun('vendorjs')})
            .pipe(plug.concat('app.vendor.min.js'))
            .pipe(gulp.dest(paths.build + 'js'));
});


/**
 *
 * Minifying and bundle the CSS
 * @return {Stream}
 *
 */
gulp.task('css', function() {
    log('Bundling, minifying, and copying the app\'s CSS');

    return gulp.src(paths.css, {since: gulp.lastRun('css')})
            .pipe(plug.concat('app.min.css'))
            .pipe(plug.autoprefixer('last 2 version', '> 5%'))
            .pipe(plug.minifyCss({}))
            .pipe(gulp.dest(paths.build + 'css'));
});


/**
 *
 * Minifying and bundle the vendor CSS
 * @return {Stream}
 *
 */
gulp.task('vendorcss', function() {
    log('Compressing, bundling, copying vendor CSS');

    var vendorFilter = plug.filter(['**/*.css']);

    return gulp.src(paths.vendorcss, {since: gulp.lastRun('vendorcss')})
            .pipe(vendorFilter)
            .pipe(plug.concat('app.vendor.min.css'))
            .pipe(plug.minifyCss({}))
            .pipe(gulp.dest(paths.build + 'css'));
});


/**
 *
 * Copy fonts
 * @return {Stream}
 *
 */
gulp.task('fonts', function() {
    log('Copying fonts');

    return gulp.src(paths.fonts)
            .pipe(gulp.dest(paths.build + 'fonts'));
});


/**
 *
 * Compress images
 * @return {Stream}
 *
 */
gulp.task('images', function() {
    log('Compressing, caching, and copying images');
    var filterSvg = plug.filter(['**/*', '!**/*.svg']);

    return gulp.src(paths.images, {since: gulp.lastRun('images')})
            .pipe(filterSvg)
            .pipe(plug.imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                optimizationLevel: 3
            }))
            .pipe(filterSvg.restore())
            .pipe(gulp.dest(paths.build + 'images'));
});


/**
 *
 * Inject all the files into the new index.html
 * rev, but no map
 * @return {Stream}
 *
 */
gulp.task('rev-and-inject', gulp.series(
    'make-config',
    gulp.parallel('js', 'vendorjs', 'css', 'vendorcss'), 
    function(cb) {
        log('Rev\'ing files and bulding index.html');

        var minified = paths.build + '**/*.min.*';
        var index = paths.client + 'index.html';
        var minFilter = plug.filter(['**/*.min.*', '!**/*.map']);
        var indexFilter = plug.filter(['index.html']);

        var stream = gulp
            .src([].concat(minified, index))
            .pipe(minFilter) //filter the stream to minified css and js
            .pipe(plug.rev()) //create files with rev's
            .pipe(gulp.dest(paths.build)) //write the rev files
            .pipe(minFilter.restore()) //remove filter, back to original stream

        // inject the files into index.html
        .pipe(indexFilter)  //filter to index.html
        .pipe(inject('css/app.vendor.min.css', 'inject-vendor'))
            .pipe(inject('css/app.min.css'))
            .pipe(inject('js/app.vendor.min.js', 'inject-vendor'))
            .pipe(inject('js/app.min.js'))
            .pipe(gulp.dest(paths.build))   //write the rev files
        .pipe(indexFilter.restore())    //remove filter, back to original stream

        //replace the files references in index.html with the rev'd files
        .pipe(plug.revReplace())    //Substitute in new filenames
        .pipe(gulp.dest(paths.build))   //write the index.html file changes
        .pipe(plug.rev.manifest())  //create the manifest (must happen last or we screw up the injection)
        .pipe(gulp.dest(paths.build));  //write the manifest

        function inject(path, name) {
            var pathGlob = paths.build + path;
            var options = {
                ignorePath: '/' + paths.build,
                read: false,
            };
            if (name) {
                options.name = name;
            }
            return plug.inject(gulp.src(pathGlob), options);
        }
        cb();
    }
));


/**
 * Run specs once and exit
 * To start servers and run midway specs as well:
 *    gulp test --startServers
 * @return {Stream}
 */
gulp.task('test', function(done) {
    startTests(true /*singleRun*/ , done);
});

/**
 * Run specs and wait.
 * Watch for file changes and re-run tests on each change
 * To start servers and run midway specs as well:
 *    gulp autotest --startServers
 */
gulp.task('autotest', function(done) {
    startTests(false /*singleRun*/ , done);
});



/**
 *
 * Build the optimized app
 * @return {Stream}
 *
 */
gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('rev-and-inject', 'images', 'fonts')
));


/**
 *
 * Watch files and build
 *
 */
gulp.task('watch', function() {
    log('Watching all files');

    var css = ['gulpfile.js'].concat(paths.css, paths.vendorcss);
    var images = ['gulpfile.js'].concat(paths.images);
    var js = ['gulpfile.js'].concat(paths.js);

    gulp
        .watch(js, gulp.parallel('js', 'vendorjs'))
        .on('change', logWatch);

    gulp
        .watch(css, gulp.parallel('css', 'vendorcss'))
        .on('unlink', function(filepath) {
            remember.forget('css', path.resolve(filepath));
        })
        .on('change', logWatch);

    gulp
        .watch(images, gulp.series('images'))
        .on('change', logWatch);

    function logWatch(event) {
        log('*** File ' + event.path + ' was ' + event.type + ', running tasks...');
    }
});


/**
 *
 * Serve the dev environment, with debug,
 * and with node inspector
 *
 */
gulp.task('serve-dev-debug', function() {
   serve({
        mode: 'dev',
        debug: '--debug'
   });
});


/**
 *
 * Serve the dev environment, with debug-brk,
 * and with node inspector
 *
 */
gulp.task('serve-dev-debug-brk', function() {
   serve({
        mode: 'dev',
        debug: '--debug-brk'
   });
});


/**
 *
 * Serve the dev environment
 *
 */
gulp.task('serve-dev', function() {
   serve({
        mode: 'dev'
   });
});


/**
 *
 * Serve the build environment
 *
 */
gulp.task('serve-build', function() {
   serve({
        mode: 'build'
   });
});


/////////////////////////////////////////////////////////////////////////////////////
//
// Browser-sync
//
/////////////////////////////////////////////////////////////////////////////////////
gulp.task('serve-simple', function() {

    browserSync.init({
        server: '../build'
    });

    browserSync.watch('../build/**/*.*').on('change', browserSync.reload);
});



/////////////////////////////////////////////////////////////////////////////////////
//
// Special little hack for local ENV
//
/////////////////////////////////////////////////////////////////////////////////////
gulp.task('copy-data', function() {
    return gulp.src('../data/**/*')
        .pipe(gulp.dest(paths.build + 'data'));
});



/////////////////////////////////////////////////////////////////////////////////////
//
// Dev process - first build, then watch and sync
//
/////////////////////////////////////////////////////////////////////////////////////
gulp.task('dev',
    gulp.series('build', 'copy-data', gulp.parallel('watch', 'serve-simple'))
);



gulp.task('default', gulp.series('build'));


/**
 *
 * Start the node server using nodemon
 * Optionally start the node debugging
 * @param {Object} args     debuggind arguments
 * @return {Stream}
 *
 */
function serve(args) {
    var options = {
        script: paths.server + 'app.js',
        delayTime: 1,
        env: {
            'NODE_ENV': args.mode,
            'PORT': port
        },
        watch: [paths.server]
    };

    var exec;
    if (args.debug) {
        log('Running node-inspector. Browse to http://localhost:8080/debug?port=5858');
        exec = require('child_process').exec;
        exec('node-inspector');
        options.nodeArgs = [args.debug + '=5858'];
    }

    return plug.nodemon(options)
            .on('start', function() {
                startBrowserSync();
            })
            .on('restart', function() {
                log('restarted!');
                setTimeout(function() {
                    browserSync.reload({ stream: false });
                }, 1000);
            });
}


/**
 *
 * Start BrowserSync
 *
 */
function startBrowserSync() {
    if (!env.browserSync || browserSync.active) {
        return;
    }

    log('Starting BrowserSync on port ' + port);
    browserSync({
        proxy: 'localhost:' + port,
        port: 3000,
        files: [paths.client + '/**/*.*'],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 5000
    });
}



/**
 *
 * Execute JSHint on given source files
 * @param  {Array} sources
 * @param  {String} overrideRcFile
 * @return {Stream}
 *
 */

function analyzejshint(sources, overrideRcFile) {
    var jshintrcFile = overrideRcFile || './.jshintrc';
    log('Running JSHint');
    log(sources);
    return gulp.src(sources)
            .pipe(plug.jshint(jshintrcFile))
            .pipe(plug.jshint.reporter('jshint-stylish'));
}


/**
 *
 * Execute JSCS on given source files
 * @param  {Array} sources
 * @return {Stream}
 *
 */
function analyzejscs(sources) {
    log('Running JSCS');
    return gulp.src(sources)
            .pipe(plug.jscs('./.jscsrc'));
}


/**
 *
 * Start Plato inspector and visualizer
 *
 */
function startPlatoVisualizer() {
    log('Running Plato');

    var files = glob.sync('../src/client/app/**/*.js');
    var excludeFiles = /\.\.\/src\/client\/app\/.*\.spec\.js/;

    var options = {
        title: 'Plato Inspections Report',
        exclude: excludeFiles
    };
    var outputDir = '../report/plato';

    plato.inspect(files, outputDir, options, platoCompleted);

    function platoCompleted(report) {
        var overview = plato.getOverviewReport(report);
        log(overview.summary);
    }
}


/**
 * Start the tests using karma.
 * @param  {boolean} singleRun - True means run once and end (CI), or keep running (dev)
 * @param  {Function} done - Callback to fire when karma is done
 * @return {undefined}
 */
function startTests(singleRun, done) {
    var child;
    var excludeFiles = ['./src/client/app/**/*spaghetti.js'];
    var fork = require('child_process').fork;

    if (env.startServers) {
        log('Starting servers');
        var savedEnv = process.env;
        savedEnv.NODE_ENV = 'dev';
        savedEnv.PORT = 8888;
        child = fork('src/server/app.js', childProcessCompleted);
    } else {
        excludeFiles.push('./src/client/test/midway/**/*.spec.js');
    }

    karma.start({
        configFile: __dirname + '/karma.conf.js',
        exclude: excludeFiles,
        singleRun: !!singleRun
    }, karmaCompleted);

    ////////////////

    function childProcessCompleted(error, stdout, stderr) {
        log('stdout: ' + stdout);
        log('stderr: ' + stderr);
        if (error !== null) {
            log('exec error: ' + error);
        }
    }

    function karmaCompleted() {
        if (child) {
            child.kill();
        }
        done();
    }
}


/**
 *
 * Formatter for bytediff to display the size changes after processing
 * @param {Object} data - byte data
 * @return {String} Difference in bytes, formatted
 *
 */
function bytediffFormatter(data) {
    var difference = (data.savings > 0) ? ' smaller.' : ' larger.';

    return data.fileName + ' went from ' +
           (data.startSize / 1000).toFixed(2) + ' kB to ' + 
           (data.endSize / 1000).toFixed(2) + ' kB' + 
           ' and is ' + formatPercent(1 - data.percent, 2) + '%' + difference;
}

/**
 *
 * Format a number as a percentage
 * @param {Number} num          Number to format as a percent
 * @param {Number} precision    Precision of the decimal
 * @return {String}             Formatted percentage
 *
 */
function formatPercent(num, precision) {
    return (num * 100).toFixed(precision);
}



