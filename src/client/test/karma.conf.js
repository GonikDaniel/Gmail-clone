// Karma configuration
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    // resolved relative to where this karma.conf file is
    basePath: '..',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
        /* vendor libraries */
        './scripts/jquery/dist/jquery.js',
        './scripts/angular/angular.js',
        './scripts/angular-ui-router/release/angular-ui-router.js',
        './scripts/underscore/underscore.js',
        './scripts/restangular/dist/restangular.js',
        './scripts/angular-cookies/angular-cookies.js',
        './scripts/ngstorage/ngStorage.js',
        './scripts/ng-dialog/js/ngDialog.js',

        './scripts/moment/moment.js',
        './scripts/toastr/toastr.js',

        /* test libraries */
        './scripts/angular-mocks/angular-mocks.js',
        // './test/lib/bind-polyfill.js', // Needed for phantomJS

        /* application scripts */
        './app/**/*module*.js', // ensure it loads first
        './app/**/*.js',

        /* Specs (tests) */
        // './test/specs/*.spec.js',
        './test/specs/top-nav.directive.spec.js',
        './test/specs/tab-nav.directive.spec.js',
        './test/specs/side-nav.directive.spec.js',
        './test/specs/settings.service.spec.js',
        // './test/specs/contacts.controller.spec.js',
        // './test/specs/mail-index.controllers.spec.js',
        // './test/specs/mail-read.controllers.spec.js',
        './test/specs.async/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
        /* testrunner configurations */
        './test/*.config.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        // source files, that you wanna generate coverage for 
        // do not include tests or libraries 
        // (these files will be instrumented by Istanbul) 
        './app/**/*.js': ['coverage']
    },

    coverageReporter: {
        type : 'html',
        dir : './test/coverage/'
    },


    //You can change xml files with tests result location
    allureReport: {
        reportDir: './test/report'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage', 'allure'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)

    browsers: ['PhantomJS'],
    // browsers: ['Chrome'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
