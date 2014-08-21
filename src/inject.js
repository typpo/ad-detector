'use strict';

/*
 * Ad Detector (C2014 Ian Webster, MIT License)
 *
 * Detect articles that are sponsored and put a big red banner at the top of the
 * page.
 */


// Firefox and Chrome differ from how to get the correct window variable.
var _window = typeof unsafeWindow === 'undefined' ? window : unsafeWindow;


function getRuleForPage() {
  var domain = _window.location.host;
  domain = domain.replace('www.', '');
  return _window.AD_DETECTOR_RULES[domain];
}


function addWarningBanner(sponsorName) {
  // Puts a big red banner at the top of the page.
  var body = document.getElementsByTagName('body')[0];
  var banner = document.createElement('div');
  banner.className = 'ad-detector-css-reset ad-detector-banner';
  body.appendChild(banner);

  // Give room for banner to show. This doesn't work on all sites.
  body.style.marginTop = '65px';

  var textElt = document.createElement('span');
  var text = '[AdDetector] This page is an advertisement ' +
      'paid for by ' + (sponsorName || 'a sponsor') + '&nbsp;&times;';
  textElt.innerHTML = text;
  banner.appendChild(textElt);

  banner.onclick = function() {
    this.remove();
  }
}


(function run() {
  var scanners = getRuleForPage();
  if (!scanners) {
    return;
  }

  for (var i=0; i < scanners.length; i++) {
    var scanner = scanners[i];
    if (scanner.match()) {
      addWarningBanner(scanner.getSponsor());
      break;
    }
  }
})();


