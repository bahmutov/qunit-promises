/*global module:false*/
module.exports = function (grunt) {
  // time tasks
  module.require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: grunt.file.readJSON('jshint.json'),

    complexity: grunt.file.readJSON('complexity.json'),

    qunit: {
      all: ['index.html']
    },

    'node-qunit': {
      all: {
        deps: './qunit-promises.js',
        code: './test/node-tests.js',
        tests: './test/node-tests.js'
      }
    }
  });

  var plugins = module.require('matchdep').filterDev('grunt-*');
  plugins.forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['deps-ok', 'jshint', 'node-qunit', 'qunit', 'complexity']);
};
