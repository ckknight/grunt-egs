var grunt = require('grunt');
var fs = require('fs');

function fixNewlines(text) {
  if (process.platform === 'win32') {
    text = text.replace(/\r\n/g, '\n');
  }
  return text;
}

function readFile(file, options) {
  'use strict';

  var contents = grunt.file.read(file, options);

  return fixNewlines(contents);
}

function assertFileEquality(test, pathToActual, pathToExpected, message) {
    var actual = readFile(pathToActual);
    var expected = readFile(pathToExpected);
    test.equal(expected, actual, message);
}

exports.gorilla = {
  compileDefault: function(test) {
    'use strict';

    test.expect(1);

    assertFileEquality(test,
      'tmp/default.js',
      'test/expected/default.js',
      'Should compile EGS Package to JavaScript');
    
    test.done();
  },
  compileCoverage: function(test) {
    'use strict';

    test.expect(1);

    assertFileEquality(test,
      'tmp/coverage.js',
      'test/expected/coverage.js',
      'Should compile EGS Package to JavaScript with coverage');
    
    test.done();
  },
  compileMaps: function(test) {
    'use strict';

    test.expect(2);

    assertFileEquality(test,
      'tmp/maps.js',
      'test/expected/maps.js',
      'Should compile EGS Package to JavaScript with source maps');
    
    assertFileEquality(test,
      'tmp/maps.js.map',
      'test/expected/maps.js.map',
      'Should compile EGS Package with source map');

    test.done();
  },
  compileCoverageMaps: function(test) {
    'use strict';

    test.expect(2);

    assertFileEquality(test,
      'tmp/coverageMaps.js',
      'test/expected/coverageMaps.js',
      'Should compile EGS Package to JavaScript with source maps and coverage');
    
    assertFileEquality(test,
      'tmp/coverageMaps.js.map',
      'test/expected/coverageMaps.js.map',
      'Should compile EGS Package with source map and coverage');

    test.done();
  },
  encoding: function(test) {
    'use strict';
    
    test.expect(1);
    
    var actual = fixNewlines(fs.readFileSync('tmp/utf16.js', 'utf16le'));
    var expected = fixNewlines(fs.readFileSync('test/expected/utf16.js', 'utf16le'));
    test.equal(expected, actual, "Should compile EGS Package with encoding UTF-16-le");
    
    test.done();
  }
};
