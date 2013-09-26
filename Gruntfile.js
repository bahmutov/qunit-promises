/*global module:false*/
module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //datetime: Date.now(),
    
    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      'default': {
        src: [ '*.js' ]
      }
    },
    
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

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-deps-ok');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-node-qunit');

  grunt.registerTask('default', ['deps-ok', 'jshint', 'node-qunit', 'qunit']);
};