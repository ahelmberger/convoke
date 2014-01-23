'use strict';

var libconvoke, path;

libconvoke = require('../lib/libconvoke.js');
path       = require('path');

exports['computeDestination'] = {
  'when invoked with with the short path option': function (test) {
    var sourcePath, destinationFolder, expectedPath;
    sourcePath        = path.resolve(path.join('something', 'else.html'));
    destinationFolder = path.resolve(path.join('another', 'thing'));
    expectedPath      = path.resolve(path.join('another', 'thing', 'else.html'));
    test.expect(1);
    test.equal(libconvoke.computeDestination(sourcePath, destinationFolder), expectedPath, 'should return the correct computed destination.');
    test.done();
  },
  'when invoked with with the full path option': function (test) {
    var sourcePath, destinationFolder, expectedPath;
    sourcePath        = path.resolve(path.join('home', 'something', 'else.html'));
    destinationFolder = path.resolve(path.join('home', 'another', 'thing'));
    expectedPath      = path.resolve(path.join('home', 'another', 'thing', sourcePath.replace(/[\/\\\:]/g, '_')));
    test.expect(1);
    test.equal(libconvoke.computeDestination(sourcePath, destinationFolder, true), expectedPath, 'should return the correct computed destination.');
    test.done();
  },
  'when invoked with with the full path option and a custom escape character': function (test) {
    var sourcePath, destinationFolder, expectedPath;
    sourcePath        = path.resolve(path.join('home', 'something', 'else.html'));
    destinationFolder = path.resolve(path.join('home', 'another', 'thing'));
    expectedPath      = path.resolve(path.join('home', 'another', 'thing', sourcePath.replace(/[\/\\\:]/g, '$')));
    test.expect(1);
    test.equal(libconvoke.computeDestination(sourcePath, destinationFolder, true, '$'), expectedPath, 'should return the correct computed destination.');
    test.done();
  },
  'when invoked with with an empty source path': function (test) {
    var sourcePath, destinationFolder;
    sourcePath        = '';
    destinationFolder = path.resolve(path.join('another', 'thing'));
    test.expect(1);
    test.throws(function () { libconvoke.computeDestination(sourcePath, destinationFolder); }, 'should throw an error.');
    test.done();
  },
  'when invoked with with an empty destination folder': function (test) {
    var sourcePath, destinationFolder;
    sourcePath        = path.resolve(path.join('something', 'else.html'));
    destinationFolder = '';
    test.expect(1);
    test.throws(function () { libconvoke.computeDestination(sourcePath, destinationFolder); }, 'should throw an error.');
    test.done();
  }
};
