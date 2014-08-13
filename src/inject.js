/*
 * Ad Detector (C2014 Ian Webster, MIT License)
 *
 * Detect articles that are sponsored and put a big red banner at the top of the
 * page.
 */

chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);
      run();
    }
  }, 10);
});


function run() {
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
}


function getRuleForPage() {
  var domain = window.location.host;
  domain = domain.replace('www.', '');
  return AD_DETECTOR_RULES[domain];
}


function addWarningBanner(sponsorName) {
  // Puts a big red banner at the top of the page.
  var banner = document.createElement('div');
  banner.className = 'ad-detector-banner';
  document.getElementsByTagName('body')[0].appendChild(banner);

  var textElt = document.createElement('span');
  var text = '[AdDetector] This article is an advertisement ' +
      'paid for by ' + (sponsorName || 'a sponsor');
  textElt.innerHTML = text;
  banner.appendChild(textElt);

  banner.onclick = function() {
    this.remove();
  }
}
