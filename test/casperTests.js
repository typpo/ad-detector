/**
 * This test runs the extension end-to-end for a list of urls in url_list,
 * verifying that all urls trigger the banner.
 */

var TIMEOUT = 1 * 60 * 1000;  // per site, in ms
var fs = require('fs');
var utils = require('utils');
var rules = JSON.parse(fs.read('url_list'));

casper.userAgent('Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36');
casper.options.stepTimeout = TIMEOUT;
casper.options.onStepTimeout = function(request) {
  //this.test.assert(false, 'Timed out');
  casper.echo('Timed out');
  //request.abort();
};
casper.options.pageSettings.loadImages = false;
casper.options.pageSettings.loadPlugins = false;
casper.options.pageSettings.resourceTimeout = 6*1000;

casper.test.begin('Banner loads on example pages, without false positives',
                  rules.length*2, function(test) {
  var testBanner = function(url, expectVisible) {
    this.page.injectJs('../src/rules.js');
    this.page.injectJs('../src/inject.js');
    var bannerIsVisible = this.evaluate(function () {
      return document.querySelector('.ad-detector-banner') !== null;
    });
    if (expectVisible) {
      test.assert(bannerIsVisible, 'Banner should be visible on ' + url);
    } else {
      test.assert(!bannerIsVisible, 'Banner should *not* be visible on ' + url);
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
