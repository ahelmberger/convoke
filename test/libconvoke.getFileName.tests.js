'use strict';

var libconvoke, path;

libconvoke = require('../lib/libconvoke.js');
path       = require('path');

exports['getFileName'] = {
  'when invoked with an absolute path': function (test) {
    test.expect(1);
    test.equal(libconvoke.getFileName(path.join('C:', 'something', 'else.html')), 'else.html', 'should return the file name.');
    test.done();
  },
  'when invoked with a relative path': function (test) {
    test.expect(1);
    test.equal(libconvoke.getFileName(path.join('..', 'something', 'else.html')), 'else.html', 'should return the file name.');
    test.done();
  },
  'when invoked with an empty string': function (test) {
    test.expect(1);
    test.equal(libconvoke.getFileName(''), '', 'should return an empty string.');
    test.done();
  }
};