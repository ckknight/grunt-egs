/*
 * grunt-gorilla
 * https://github.com/ckknight/grunt-gorilla
 *
 * Copyright (c) 2013 Cameron Kenneth Knight
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },
    
    // compile the task
    gorilla: {
      task: {
        files: {
          'tasks/egs.js': ['tasks/egs.gs']
        }
      }
    },
    
    // Configuration to be run (and then tested).
    egs: {
      compileDefault: {
        files: {
          'tmp/default.js': ['test/fixtures']
        }
      },
      compileCoverage: {
        options: {
          coverage: true
        },
        files: {
          'tmp/coverage.js': ['test/fixtures']
        }
      },
      compileMaps: {
        options: {
          sourceMap: true
        },
        files: {
          'tmp/maps.js': ['test/fixtures']
        }
      },
      compileCoverageMaps: {
        options: {
          sourceMap: true,
          coverage: "myCoverage"
        },
        files: {
          'tmp/coverageMaps.js': ['test/fixtures']
        }
      },
      encoding: {
        options: {
          encoding: "utf16le"
        },
        files: {
          'tmp/utf16.js': ['test/fixtures']
        }
      },
      includeRuntime: {
        options: {
          includeRuntime: true
        },
        files: {
          'tmp/includeRuntime.js': ['test/fixtures']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');
  grunt.loadNpmTasks('grunt-gorilla');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'egs', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['gorilla', 'test', 'build-contrib']);

};
