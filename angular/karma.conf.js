// Karma configuration
// Generated on Thu Mar 13 2014 18:39:11 GMT+0100 (CET)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'public/components/jquery/dist/jquery.min.js',
      'public/components/bootstrap/dist/js/bootstrap.min.js',
      'public/components/angular/angular.min.js',
      'public/components/angular-mocks/angular-mocks.js',
      'public/components/angular-route/angular-route.min.js',
      'public/components/angular-resource/angular-resource.min.js',
      'public/components/angular-ui-utils/ui-utils.js',
      'public/components/angular-bootstrap/ui-bootstrap-tpls.js',
      'public/components/underscore/underscore.js',
      'public/components/angular-underscore-module/angular-underscore-module.js',
      'public/components/selectize/dist/js/standalone/selectize.js',
      'public/js/*.js',
      'public/js/**/*.js',
      'test/frontend/**/*.js'  
    ],


    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {},

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


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
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};