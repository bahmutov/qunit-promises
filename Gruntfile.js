/*global module:false*/
module.exports = function (grunt) {
  module.require('time-grunt')(grunt);

  grunt.initConfig({

    sync: {
      all: {
        options: {
          sync: ['author', 'name', 'version', 'description', 'homepage', 'license']
        }
      }
    },

    jshint: grunt.file.readJSON('jshint.json'),

    complexity: grunt.file.readJSON('complexity.json'),

    qunit: {
      all: ['index.html']
    },

    'node-qunit': {
      all: {
        deps: './qunit-promises.js',
        code: './qunit-promises.js',
        tests: ['./test/node-tests.js', './test/node-once-tests.js']
      }
    }
  });

  var plugins = module.require('matchdep').filterDev('grunt-*');
  plugins.forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['deps-ok', 'sync',
    'jshint', 'node-qunit', 'qunit', 'complexity']);
};
