/* Rules for identifying ads on individual domains. */
window.AD_DETECTOR_RULES = {
  'paidpost.nytimes.com': [
    {
      match: function() {
        return true;
      },
      getSponsor: function() {
        var paidElts = document.getElementsByClassName('paid-top-border-txt');
        if (paidElts.length < 1) {
          return null;
        }
        return paidElts[0].innerHTML.replace('PAID FOR AND POSTED BY ', '');
      },
    },
  ],
  'theatlantic.com': [
    {
      match: function() {
        return document.getElementsByClassName('sponsor-warning').length > 0;
      },
      getSponsor: function() {
        // Too hard to tell reliably, for now.
        return null;
      },
    },
  ],
  'buzzfeed.com': [
    {
      match: function() {
        var elts = document.getElementsByClassName('author_title');
        if (elts.length > 0) {
          return elts[0].innerHTML.indexOf('Brand Publisher') > -1;
        }
        return false;
      },
      getSponsor: function() {
        var elts = document.querySelectorAll('[rel="author"]')
        if (elts.length > 0) {
          return elts[0].innerHTML.trim()
        }
        return null;
      },
    },
  ],
  'gawker.com': [
    {
      match: function() {
        return document.getElementsByClassName('sponsored-label').length > 0;
      },
      getSponsor: function() {
        return null;
      },
    },
  ],
};
