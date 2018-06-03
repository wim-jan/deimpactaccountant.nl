const del = require('del');
const path = require('path');

const publicDir = path.join('static');

// set environment variable NODE_ENV to 'PRODUCTION' to run in production mode
const production = process.env.NODE_ENV === 'PRODUCTION';

// set environment variable DEBUG to 1 to run in debug mode
const debug = process.env.DEBUG || false;

console.log('running in ' + (production ? 'PRODUCTION' : 'DEVELOPMENT') +
  ' environment');

if (debug) {
  console.log("debug mode active");
}

// clean public destination dir in production mode, to get a clean build
if (production) {
  console.log('cleaning public directory: ' + publicDir);
  del(publicDir);
}

var brunchConfig = {

  production: production,
  // sourcemaps only in development mode
  sourceMaps: !production,

  files: {
    javascripts: {
      /*
      Describes how files will be compiled & joined together.
      Available formats:
      - 'outputFilePath'
      - map of ('outputFilePath': /regExp that matches input path/)
      - map of ('outputFilePath': function that takes input path)
      */
      joinTo: {
        'vendor.js': /^node_modules/,
        'app.js': /^app/
      }
    },
    stylesheets: {
      joinTo: {
        'app.css': /^(app|vendor)/
      }
    }
  },

  // auto require app.js module to start it
  modules: {
  },

  // App paths configuration
  paths: {
    // Which directories to watch, default: ['app', 'test', 'vendor']
    watched: ["app", "vendor", path.join('node_modules', 'js')],

    // Where to compile files to
    public: publicDir
  },

  plugins: {

    // sass-brunch - https://github.com/brunch/sass-brunch
    sass: {
      mode: 'native',
      options: {
        includePaths: [
          'node_modules/the-flex-grid/dist/',
          'node_modules/skel-framework-npm/dist/skel',
          'node_modules/font-awesome'
        ]
      }
    },

    // cleancss - https://github.com/brunch/clean-css-brunch
    // see https://github.com/jakubpawlowicz/clean-css for options
    cleancss: {
      keepSpecialComments: 1,
      removeEmpty: true
    },

    // babel - https://github.com/babel/babel-brunch
    babel: {
      // Do not use ES6 compiler in vendor code
      ignore: [
        /^(test|vendor)/,
        path.join('app', 'legacyES5Code', '**', '*')
      ],
      presets: ['es2015']
    },

    // assets manager - https://github.com/ocombe/assetsmanager-brunch
    assetsmanager: {
      copyTo: {
        fonts: [
          path.join('node_modules', 'font-awesome', 'fonts', '*')
        ],
        vendor: [
          path.join('node_modules', 'font-awesome', 'css', 'font-awesome.min.css')
        ]
      },
      // assets won't be copied more frequent than once per X seconds.
      minTimeSpanSeconds: 10
    },
  }
};

if (debug) {
  console.log("\n\ncurrent brunch config:\n");
  console.log(brunchConfig);
}

module.exports = brunchConfig;