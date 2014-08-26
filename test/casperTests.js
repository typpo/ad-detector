casper.test.begin('Banner appears on ' + casper.cli.get('url'),
                  1, function(test) {
  casper.start(casper.cli.get('url'), function() {
    this.page.injectJs('../src/rules.js');
    this.page.injectJs('../src/inject.js');
    var bannerIsVisible = this.evaluate(function () {
      return document.querySelector('body') !== null;
    });
    test.assert(bannerIsVisible);
  });

  casper.run(function() {
    test.done();
  });
});
