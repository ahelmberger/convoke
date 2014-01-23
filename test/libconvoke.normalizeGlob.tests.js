'use strict';

var libconvoke = require('../lib/libconvoke.js');

exports['normalizeGlob'] = {
  'when invoked with unallowed characters': function (test) {
    test.expect(1);
    test.equal(libconvoke.normalizeGlob('.\\something\\**\\*.html'), './something/**/*.html', 'should return the normalized (UNIX-style) GLOB.');
    test.done();
  },
  'when invoked with an empty string': function (test) {
    test.expect(1);
    test.equal(libconvoke.normalizeGlob(''), '', 'should return an empty string.');
    test.done();
  }
};
