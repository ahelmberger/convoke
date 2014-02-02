#! /usr/bin/env node

/*
 * convoke
 * https://github.com/ahelmberger/convoke
 *
 * Copyright (c) 2014 Andreas Helmberger
 * Licensed under the MIT license.
 */

'use strict';

var fs, path, fstools, cli, glob, libconvoke;

fs         = require('fs');
path       = require('path');
fstools    = require('fs-tools');
cli        = require('cli');
glob       = require('glob');
libconvoke = require('./libconvoke');

cli.enable('help', 'version');
cli.setApp('convoke', '0.9.1');
cli.parse({
  'full-path':   ['f', 'Prepends each file name with its original full path'],
  'escape-char': ['c', 'Escape character, if "full-path" option is set', 'string', libconvoke.DEFAULT_ESCAPE_CHAR],
  'dry-run':     ['y', 'Dry run, just shows the result, does not move any files']
});

cli.main(function (args, options) {
  var sourceGlob, destinationFolder, fullPath, escapeChar, dryRun;

  if (args.length !== 2) {
    this.error('You must specify input and output.');
    return;
  }

  sourceGlob        = libconvoke.normalizeGlob(args[0], '/');
  destinationFolder = path.normalize(path.resolve(args[1]));
  fullPath          = options['full-path'];
  escapeChar        = options['escape-char'];
  dryRun            = options['dry-run'];

  if (dryRun) {
    this.info('Starting dry run...');
  }

  if (!fs.existsSync(destinationFolder)) {
    this.info('Creating destination folder: ' + destinationFolder);
    if (!dryRun) {
      fstools.mkdirSync(destinationFolder, '0777');
    }
  } else if (fs.readdirSync(destinationFolder).length) {
    this.error('Destination folder is not empty: ' + destinationFolder);
    return;
  } else {
    this.info('Destination folder already exists: ' + destinationFolder);
  }

  glob(sourceGlob, { nonnull: false, sync: true }, (function (error, files) {
    var results, result, duplicates, duplicate, i;

    if (error) {
      this.error(error);
      return;
    }

    results = files.map(function (file) {
      file = path.normalize(file);
      return {
        source: file,
        destination: libconvoke.computeDestination(file, destinationFolder, fullPath, escapeChar)
      };
    });

    duplicates = libconvoke.getDuplicates(results, function (res) {
      return res.destination;
    });

    if (duplicates.length) {
      this.error('This operation would result in following duplicate files:');
      for (i = 0; i < duplicates.length; i++) {
        duplicate = duplicates[i];
        this.error(duplicate.count + 'x "' + duplicate.value.destination + '"');
      }      
      this.error('No files were moved.');
      return;
    }

    for (i = 0; i < results.length; i++) {
      result = results[i];
      this.info('Moving "' + result.source + '" to "' + result.destination + '"');
      if (!dryRun) {
        fs.renameSync(result.source, result.destination);
      }
    }

    this.ok('Moved ' + results.length + ' files.');

  }).bind(this));

});
