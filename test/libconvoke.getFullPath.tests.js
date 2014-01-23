'use strict';

var libconvoke, path;

libconvoke = require('../lib/libconvoke.js');
path       = require('path');

exports['getFullPath'] = {
  'when invoked with an absolute path': function (test) {
    test.expect(1);
    test.equal(libconvoke.getFullPath(path.join('home', 'something', 'else.html')), path.resolve(path.join('home', 'something', 'else.html')), 'should return the full path.');
    test.done();
  },
  'when invoked with a relative path': function (test) {
    test.expect(1);
    test.equal(libconvoke.getFullPath(path.join('..', 'something', 'else.html')), path.resolve(path.join('..', 'something', 'else.html')), 'should return the full path.');
    test.done();
  },
  'when invoked with an empty string': function (test) {
    test.expect(1);
    test.equal(libconvoke.getFullPath(''), '', 'should return an empty string.');
    test.done();
  }
};
