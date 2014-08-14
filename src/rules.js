'use strict';

/*
 * Rules for identifying ads on individual domains.
 *
 * match: Returns true if the current article is sponsored.
 * getSponsor: Returns the name of the sponsor. Null if unknown.
 */
window.AD_DETECTOR_RULES = {
  'ad-assets.nytimes.com': [
    {
      example: 'http://ad-assets.nytimes.com/paidpost/dell/will-millennials-ever-completely-shun-the-office.html',
      match: function() {
        return true;
      },
      getSponsor: function() {
        var paidElts = document.getElementsByClassName('paid-head-tag');
        if (paidElts.length < 1) {
          return null;
        }
        return paidElts[0].innerHTML.replace('PAID FOR AND POSTED BY ', '');
      },
    },
  ],
  'buzzfeed.com': [
    {
      example: 'http://www.buzzfeed.com/bravo/ways-to-up-your-online-dating-game',
      match: function() {
        var elts = document.getElementsByClassName('author_title');
        if (elts.length > 0) {
          return elts[0].innerHTML.indexOf('Brand Publisher') > -1;
        }
        return false;
      },
      getSponsor: function() {
        var elts = document.querySelectorAll('[rel="author"]');
        if (elts.length > 0) {
          return elts[0].innerHTML.trim();
        }
        return null;
      },
    },
  ],
  'deadspin.com': [
    {
      example: 'http://deadspin.com/5969545/exclusive-could-this-be-chris-pauls-secret-twin-brother',
      match: function() {
        return document.getElementsByClassName('sponsored-label').length > 0;
      },
      getSponsor: function() {
        return null;
      },
    },
  ],
  'fastcompany.com': [
    {
      example: 'http://www.fastcompany.com/3002725/infographic-upss-2012-change-supply-chain-survey',
      match: function() {
        return window.bootstrap_obj ? window.bootstrap_obj.sponsored : false;
      },
      getSponsor: function() {
        return null;
      },
    },
  ],
  'forbes.com': [
    {
      example: 'http://www.forbes.com/sites/fidelity/2014/04/29/should-you-accept-your-employers-pension-buyout-offer/',
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
      example: 'http://gawker.com/5974129/how-to-transform-into-a-total-nerd-babe/',
      match: function() {
        return document.getElementsByClassName('sponsored-label').length > 0;
      },
      getSponsor: function() {
        return null;
      },
    },
  ],
  'huffingtonpost.com': [
    {
      example: 'http://www.huffingtonpost.com/2014/07/24/things-you-never-knew-about-tequila_n_5589092.html',
      match: function() {
        return document.getElementsByClassName('sponsor_wrapper').length > 0;
      },
      getSponsor: function() {
        var paidElts = document.querySelectorAll('.sponsor_wrapper .sponsor_title_wrapper span');
        if (paidElts.length < 1) {
          return null;
        }
        return paidElts[0].innerHTML.replace('Presented by ', '');
      }
    }
  ],
  'paidpost.nytimes.com': [
    {
      example: 'http://paidpost.nytimes.com/vacheron-constantin/transmitting-craftsmanship.html',
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
  'mashable.com': [
    {
      example: 'http://mashable.com/2013/03/12/dog-mans-best-friend/',
      match: function() {
        return window.__o.content_source_type === 'Supported' ||
            window.__o.content_source_type === 'Sponsored' ||
            window.__o.topics.toLowerCase().indexOf('sponsored') > -1;
      },
      getSponsor: function() {
        var source = window.__o.content_source_name;
        if (!source || source === 'Internal') {
          // Discard false positives.
          return null;
        }
        return source[0].toUpperCase() + source.slice(1);
      },
    },
  ],
  'slate.com': [
    {
      example: 'http://www.slate.com/articles/news_and_politics/uc/2014/06/living_forever_the_right_way.html',
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
      example: 'http://www.theatlantic.com/sponsored/ibm-big-data/big-data-grows-new-role-emerges-chief-data-officer/102/',
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
      example: 'http://www.theonion.com/sponsored/woman-going-to-take-quick-break-after-filling-out,85/',
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
  'vanityfair.com': [
    {
      example: 'http://www.vanityfair.com/online/oscars/2013/12/hennessy-sir-malcolm-campbell-speed-racer',
      match: function() {
        var elts = document.getElementsByClassName('rubric');
        if (elts.length < 1) {
          return false;
        }
        return elts[0].innerHTML === 'SPONSOR CONTENT';
      },
      getSponsor: function() {
        return null;
      },
    },
  ],
  'washingtonpost.com': [
    {
      example: 'http://www.washingtonpost.com/sf/brand-connect/wp/enterprise/one-year-later-a-commitment-renewed/',
      match: function() {
        // TODO Can also check for WP Brand Connect in URL, "left title-bar", or in title
        var elts = document.querySelectorAll('.bylines .byline .byline-title');
        if (elts.length < 1) {
          return false;
        }
        return elts[0].innerHTML.indexOf('Sponsor Generated Content') > -1;
      },
      getSponsor: function() {
        // Uses images of sponsors' logos
        return null;
      }
    }
  ]
};
