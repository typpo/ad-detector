/**
 * This test runs the extension end-to-end for a list of urls in test_url_list,
 * verifying that all urls trigger the banner.
 */

var TIMEOUT = 3 * 60 * 1000;  // per site, in ms
var fs = require('fs');
var utils = require('utils');
var rules = JSON.parse(fs.read('test_url_list'));

casper.userAgent('Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36');
casper.options.stepTimeout = TIMEOUT;
casper.options.onStepTimeout = function() {
  casper.echo('Test timed out');
};

casper.test.begin('Banner loads on example pages, without false positives',
                  rules.length, function(test) {
  var testBanner = function(url, expectVisible) {
    this.page.injectJs('../src/rules.js');
    this.page.injectJs('../src/inject.js');
    var bannerIsVisible = this.evaluate(function () {
      return document.querySelector('.ad-detector-banner') !== null;
    });
    if (expectVisible) {
      test.assert(bannerIsVisible, 'Banner is visible on ' + url);
    } else {
      test.assert(!bannerIsVisible, 'Banner isn\'t visible on ' + url);
    }
  };

  casper.start().each(rules, function(self, rule) {
    self.then(function() {
      casper.echo('Loading ' + rule.example + ' ...');
    });
    self.thenOpen(rule.example, function() {
      testBanner.call(this, rule.example, true);
    });
    self.then(function() {
      casper.echo('Loading ' + rule.root + ' ...');
    });
    self.thenOpen(rule.root, function() {
      if (rule.shouldRootDomainTrigger) {
        testBanner.call(this, rule.root, true);
      } else {
        testBanner.call(this, rule.root, false);
      }
    });
  });
  casper.run(function() {
    test.done();
  });
});
