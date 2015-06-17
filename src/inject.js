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


function addWarningBanner(rule) {
  // Puts a big red banner at the top of the page.
  var body = document.getElementsByTagName('body')[0];
  var banner = document.createElement('div');
  banner.className = 'ad-detector-css-reset ad-detector-banner';
  body.appendChild(banner);

  // Give room for banner to show. This doesn't work on all sites.
  body.style.marginTop = '65px';

  var textElt = document.createElement('span');
  var sponsorName;
  try {
    // Because reading sponsor text is sometimes complicated, catch potential
    // errors caused by site redesign etc.
    sponsorName = rule.getSponsor ? rule.getSponsor() : null;
  } catch (err) {}

  var displayMessage = rule.getCustomMessage ? rule.getCustomMessage() :
      'Content on this page is paid for by ' + (sponsorName || 'a sponsor');

  var text = '[AdDetector] ' + displayMessage + '&nbsp;&times;';
  textElt.innerHTML = text;
  banner.appendChild(textElt);

  banner.onclick = function() {
    this.remove();
  };
  textElt.onclick = function() {
    this.parentNode.remove();
  }
}


(function run() {
  if (typeof _window.AD_DETECTOR_RULES === 'undefined') {
    setTimeout(function() {
      run();
    }, 1000);
    return;
  }
  var rules = getRuleForPage();
  if (!rules) {
    return;
  }

  for (var i=0; i < rules.length; i++) {
    var rule = rules[i];
    if (rule.match()) {
      addWarningBanner(rule);
      return;
    }
  }
})();


