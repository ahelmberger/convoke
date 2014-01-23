'use strict';

var libconvoke = require('../lib/libconvoke.js');

exports['escapePath'] = {
  'when invoked with unallowed characters': function (test) {
    test.expect(1);
    test.equal(libconvoke.escapePath('C:\\something\\else.html', '$'), 'C$$something$else.html', 'should return the escaped path.');
    test.done();
  },
  'when invoked without an escapeChar': function (test) {
    test.expect(1);
    test.equal(libconvoke.escapePath('C:\\something\\else.html'), 'C__something_else.html', 'should return the escaped path, using the default escape character.');
    test.done();
  },
  'when invoked with an empty string': function (test) {
    test.expect(1);
    test.equal(libconvoke.escapePath(''), '', 'should return an empty string.');
    test.done();
  }
};
