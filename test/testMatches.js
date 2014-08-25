/**
 * This script uses phantomjs to verify that every example triggers a match.
 *
 * TODO Tragically, I couldn't get phantom's page.injectJs to work so I do this
 * a very ugly way.  Ideally I'd like to inject the extension and run things
 * end-to-end.
 *
 * TODO This script should take an argument to test a single rule.
 */

'use strict';
var colors = require('colors');
var phantom = require('phantom');

GLOBAL.window = {};
var rulesModule = require('../src/rules.js');

var ph;
var rulesToCheck = [];
var ruleUtilBoilerplate = 'var util = {';
var testPassed = true;

// Build string of helper functions.
for (var key in rulesModule.adDetectorUtil) {
  if (rulesModule.adDetectorUtil.hasOwnProperty(key)) {
    ruleUtilBoilerplate += rulesModule.adDetectorUtil[key].toString()
        .replace('function', key + ': function') + ',';
  }
}
ruleUtilBoilerplate += '}';

phantom.create(function (newPh) {
  ph = newPh;
  for (var key in window.AD_DETECTOR_RULES) {
    var rules = window.AD_DETECTOR_RULES[key];
    rules.map(function(rule) {
      rulesToCheck.push(rule);
    });
  }
  // Each rule calls the next one. Weird because the phantom lib is
  // asynchronous, but we want to test in serial.
  testRule(0);
});  // phantom.create

function testRule(ruleIndex) {
  if (ruleIndex >= rulesToCheck.length) {
    if (testPassed) {
      process.stdout.write('Done.\n'.green.bold);
    } else {
      process.stdout.write('Done, with failures.\n'.red.bold);
    }
    die();
  }
  var rule = rulesToCheck[ruleIndex];
  ph.createPage(function(page) {
    process.stdout.write('Testing ');
    process.stdout.write(rule.example.cyan);
    process.stdout.write(' ... ');

    page.set('onAlert', function (msg) {});
    page.set('onError', function (msg) {});
    page.set('onConsoleMessage', function (msg) {});
    page.set('settings.userAgent',
             'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36');

    page.open(rule.example, function(status) {
      if (status !== 'success') {
        console.error('Loading page failed.'.bold.red);
        console.log('Status:', status);
        testPassed = false;
        return testRule(ruleIndex + 1);
      }

      // This is an ugly hack. In order to add the helper functions in rules.js,
      // we add them to the string containing the match() function and eval it
      // all in the page's context.
      var jseval =
          rule.match.toString().replace('function', 'function adDetectorMain') +
          ruleUtilBoilerplate;
      // Strip comments.
      jseval = jseval.replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:([\s;])+\/\/(?:.*)$)/gm, '');
      // And newlines.
      jseval = jseval.replace(/(\r\n|\n|\r)/gm, '');
      var functionStr = 'function() {' + 'eval("' + jseval + '");' +
          'var _window = window; return adDetectorMain(); }'

      page.evaluate(functionStr, function(result) {
        if (result !== true) {
          process.stdout.write('failed\n'.bold.red);
          console.log('Got', result, 'instead of true using this rule:');
          console.log(rule.match.toString());
          testPassed = false;
        } else {
          page.close();
          process.stdout.write('passed\n'.green);
        }
        testRule(ruleIndex + 1);
      });  // page.evaluate
    });  // page.open
  });  // ph.createPage
}

function die() {
  ph.exit();
  process.kill();
}
