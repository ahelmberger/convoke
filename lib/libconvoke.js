'use strict';

var path, pathEscapeRegExp, DEFAULT_ESCAPE_CHAR, globEscapeRegExp, GLOB_SEPARATOR;

path                = require('path');
pathEscapeRegExp    = /[\/\\\:]/g;
DEFAULT_ESCAPE_CHAR = '_';
globEscapeRegExp    = /\\/g;
GLOB_SEPARATOR      = '/';

function getFileName(fileName) {
  return path.basename(fileName);
}

function getFullPath(fileName) {
  return fileName ? path.resolve(fileName) : '';
}

function escapePath(fileName, escapeChar) {
  return fileName.replace(pathEscapeRegExp, typeof escapeChar === 'string' ? escapeChar : DEFAULT_ESCAPE_CHAR);
}

function normalizeGlob(glob) {
  return glob.replace(globEscapeRegExp, GLOB_SEPARATOR);
}

function computeDestination(sourcePath, destinationFolder, prependFullPath, escapeChar) {
  if (!sourcePath || !destinationFolder) {
    throw new Error('sourcePath or destinationFolder is empty.');
  }

  sourcePath = path.normalize(sourcePath);
  destinationFolder = path.normalize(destinationFolder);

  if (prependFullPath) {
    return path.join(destinationFolder, escapePath(getFullPath(sourcePath), escapeChar));
  } else {
    return path.join(destinationFolder, getFileName(sourcePath));
  }
}

function getDuplicates(array, normalizeFunc) {
  var hashBag;

  if (typeof normalizeFunc !== 'function') {
    normalizeFunc = function (argument) { return argument; };
  }

  hashBag = array.reduce(function (bag, element) {
    var key, entry;
    key = normalizeFunc(element);
    entry = bag[key];
    if (entry) {
      entry.count += 1;
    } else {
      bag[key] = { value: element, count: 1 };
    }
    return bag;
  }, Object.create(null));

  return Object.keys(hashBag).map(function (key) {
    return hashBag[key];
  }).filter(function (entry) {
    return entry.count > 1;
  });
}

exports.getFileName = getFileName;
exports.getFullPath = getFullPath;
exports.escapePath = escapePath;
exports.normalizeGlob = normalizeGlob;
exports.computeDestination = computeDestination;
exports.getDuplicates = getDuplicates;
exports.DEFAULT_ESCAPE_CHAR = DEFAULT_ESCAPE_CHAR;
