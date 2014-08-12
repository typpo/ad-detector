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
  var scanner = RULES[window.location.host];
  if (!scanner) {
    return;
  }

  if (scanner.match()) {
    addWarningBanner();
  }
}


function addWarningBanner() {
  // Puts a big red banner at the top of the page.
  var banner = document.createElement('div');
  banner.className = 'ad-detector-banner';
  document.getElementsByTagName('body')[0].appendChild(banner);

  var text = document.createElement('span');
  text.innerHTML = 'FYI: This article was paid for by a sponsor. ' +
      'You are reading an advertisement.'
  banner.appendChild(text);
}


/* Rules for identifying ads on individual domains. */
var RULES = {
  'nytimes.com': [
    {
      match: function() {
        // paidpost.nytimes.com
        return window.location.href.indexOf('paidpost.') > -1;
      },
      getSponsor: function() {
        // TODO
        return 'Unknown';
      },
    },
  ],
  'theatlantic.com': [
    {
      match: function() {
        // TODO
        return true;
      },
      getSponsor: function() {
        return 'Unknown';
      },
    },
  ],
  'ianww.com': [
    {
      match: function() {
        return true;
      },
      getSponsor: function() {
        return 'Unknown';
      },
    },
  ],

};
