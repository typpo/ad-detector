/*
 * Rules for identifying ads on individual domains.
 *
 * match: Returns true if the current article is sponsored.
 * getSponsor: Returns the name of the sponsor. Null if unknown.
 *
 */
window.AD_DETECTOR_RULES = {
  'buzzfeed.com': [
    {
      // Example: http://www.buzzfeed.com/bravo/ways-to-up-your-online-dating-game
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
  'deadspin.com': [
    {
      // Example: http://deadspin.com/5969545/exclusive-could-this-be-chris-pauls-secret-twin-brother
      match: function() {
        return document.getElementsByClassName('sponsored-label').length > 0;
      },
      getSponsor: function() {
        return null;
      },
    },
  ],
  'forbes.com': [
    {
      // Example: http://www.forbes.com/sites/fidelity/2014/04/29/should-you-accept-your-employers-pension-buyout-offer/
      match: function() {
        return document.getElementsByClassName('brandvoice').length > 0;
      },
      getSponsor: function() {
        return document.getElementsByClassName('brandvoice')[0].textContent;
      },
    },
  ],
  'gawker.com': [
    {
      // Example: http://gawker.com/5974129/how-to-transform-into-a-total-nerd-babe/
      match: function() {
        return document.getElementsByClassName('sponsored-label').length > 0;
      },
      getSponsor: function() {
        return null;
      },
    },
  ],
  'paidpost.nytimes.com': [
    {
      // Example: http://paidpost.nytimes.com/vacheron-constantin/transmitting-craftsmanship.html
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
  'slate.com': [
    {
      // Example: http://www.slate.com/articles/news_and_politics/uc/2014/06/living_forever_the_right_way.html
      match: function() {
        return document.getElementsByClassName('provided-by').length > 0;
      },
      getSponsor: function() {
        return null;
      },
    },
  ],
  'theatlantic.com': [
    {
      // Example: http://www.theatlantic.com/sponsored/ibm-big-data/big-data-grows-new-role-emerges-chief-data-officer/102/
      match: function() {
        return document.getElementsByClassName('sponsor-warning').length > 0;
      },
      getSponsor: function() {
        return null;
      },
    },
  ],
  'theonion.com': [
    {
      // Example: http://www.theonion.com/sponsored/woman-going-to-take-quick-break-after-filling-out,85/
      match: function() {
        return document.getElementById('sponsored-box') !== null;
      },
      getSponsor: function() {
        var elts = document.querySelectorAll('#sponsor-explanation-text h1');
        if (elts.length < 1) {
          return null;
        }
        var text = elts[0].lastChild.textContent;
        return text.slice(3, text.lastIndexOf('·') - 1);
      },
    },
  ],
};
