'use strict';

var libconvoke, identity;

libconvoke = require('../lib/libconvoke.js');
identity   = function (argument) { return argument; };

exports['getDuplicates'] = {
  'when invoked with an array containing duplicates': function (test) {
    test.expect(1);
    test.deepEqual(libconvoke.getDuplicates(['A', 'B', 'C', 'B'], identity), [{ count: 2, value: 'B' }], 'should return the duplicates.');
    test.done();
  },
  'when invoked with an array containing no duplicates': function (test) {
    test.expect(1);
    test.deepEqual(libconvoke.getDuplicates(['A', 'B', 'C', 'D'], identity), [], 'should return an empty array.');
    test.done();
  },
  'when invoked with an empty array': function (test) {
    test.expect(1);
    test.deepEqual(libconvoke.getDuplicates([], identity), [], 'should return an empty array.');
    test.done();
  },
  'when invoked without a normalize function': function (test) {
    test.expect(1);
    test.deepEqual(libconvoke.getDuplicates(['A', 'B', 'C', 'B']), [{ count: 2, value: 'B' }], 'should return the duplicates using an identity function.');
    test.done();
  }
};
