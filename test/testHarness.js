#!/usr/bin/env node
/**
 * Writes a list of urls to file and runs the casper test.
 */

'use strict';

var fs = require('fs');
var spawn = require('child_process').spawn;

GLOBAL.window = {};
var rulesModule = require('../src/rules.js');

var rules = [];
if (process.argv.length > 2) {
  // Grab just the rules for supplied site.
  var key = process.argv[2];
  window.AD_DETECTOR_RULES[key].map(function(rule) {
    rule.root = 'http://' + key;
    rules.push(rule);
  });
} else {
  for (var key in window.AD_DETECTOR_RULES) {
    window.AD_DETECTOR_RULES[key].map(function(rule) {
      rule.root = 'http://' + key;
      rules.push(rule);
    });
  }
}

fs.writeFile('url_list', JSON.stringify(rules, null, 2), function(err) {
  if (err) {
    console.error('Could not write local file test_url_list.');
  }

  var casperTests =  spawn('casperjs', ['test', 'casperTests.js', '--proxy_type=none']);
  var log = function(data) { console.log(data + ''); };
  casperTests.stdout.on('data', log);
  casperTests.stderr.on('data', log);
});
