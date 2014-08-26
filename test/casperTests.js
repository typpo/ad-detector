/**
 * This test runs the extension end-to-end for a list of urls in test_url_list,
 * verifying that all urls trigger the banner.
 *
 * TODO Simple checks to avoid false positives - for example, root page should
 * not trigger a banner in most cases.
 */

var TIMEOUT = 3 * 60 * 1000;  // per site, in ms
var fs = require('fs');
var utils = require('utils');
var rules = JSON.parse(fs.read('test_url_list'));

casper.userAgent('Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36');
casper.options.stepTimeout = TIMEOUT;
casper.options.onStepTimeout = function() {
  casper.echo('Test timed out');
  this.test.fail(this.requestUrl + ' loads in less than ' + TIMEOUT + 'ms.');
  this.test.done();
  run(this.idx + 1);
};

// For loop won't work here for some reason.
function run(idx) {
  if (idx >= rules.length) return;
  this.idx = idx;
  var rule = rules[idx];
  casper.test.begin('Banner appears on ' + rule.example,
                    1, function(test) {
    casper.start(rule.example, function() {
      this.page.injectJs('../src/rules.js');
      this.page.injectJs('../src/inject.js');
      var bannerIsVisible = this.evaluate(function () {
        return document.querySelector('.ad-detector-banner') !== null;
      });
      test.assert(bannerIsVisible);
    });

    casper.run(function() {
      test.done();
      run(idx + 1);
    });
  });
}
run(0);
