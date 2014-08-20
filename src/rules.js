'use strict';

var _window = typeof unsafeWindow === 'undefined' ? window : unsafeWindow;

/*
 * Rules for identifying ads on individual domains.
 *
 * example: Example URL that should trigger, used for testing.
 * match: Returns true if the current article is sponsored.
 * getSponsor: Returns the name of the sponsor. Null if unknown.
 */
_window.AD_DETECTOR_RULES = {
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
  'blogs.vancouversun.com': [
    {
      example: 'http://blogs.vancouversun.com/2014/03/12/cyberwarfare-expert-cancels-vancouver-talk-over-fear-of-revealing-critical-infrastructure-risks/',
      match: function() {
        return document.getElementsByClassName('tag-sponsored').length > 0;
      },
      getSponsor: function() {
        return null;
      }
    }
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
  'businessinsider.com': [
    {
      example: 'http://www.businessinsider.com/sc/music-city-pizza-owner-keith-hayman-interview-2014-7',
      match: function() {
        return _window.location.href.indexOf('/sc/') > -1 ||
            document.getElementsByClassName('tooltip-sponsor').length > 0;
      },
      getSponsor: function() {
        return null;
      },
    },
  ],
  'chicagotribune.com': [
    {
      example: 'http://www.chicagotribune.com/brandpublishing/seniorhousingguide/',
      match: function() {
        return _window.location.href.indexOf('/brandpublishing/') > -1;
      },
      getSponsor: function() {
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
  'denverpost.com': [
    {
      example: 'http://www.denverpost.com/energy-and-environment/sponsored?ccc=2106',
      match: function() {
        return _window.location.href.indexOf('/sponsored') > -1;
      },
      getSponsor: function() {
        return null;
      },
    },
  ],
  'digiday.com': [
    {
      example: 'http://digiday.com/sponsored/pulsepointbcs-84397/',
      match: function() {
        return _window.location.href.indexOf('/sponsored/') > -1 ||
            document.getElementsByClassName('sponsored-flag').length > 0;
      },
      getSponsor: function() {
        var elt = document.querySelector('[rel="author"]');
        return elt ? elt.innerHTML : null;
      }
    }
  ],
  'ew.com': [
    {
      example: 'http://www.ew.com/ew/gallery/0,,20308916_20447484_20885831,00.html',
      match: function() {
        return document.getElementsByClassName('sponsoredBy').length > 0;
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
        return _window.bootstrap_obj ? _window.bootstrap_obj.sponsored : false;
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
  'fortune.com': [
    {
      example: 'http://fortune.com/contentfrom/2014/07/01/Content-Marketing-A-Winner-on-Mobile/?ntv_a=0pABAL54BAfxgFA',
      match: function() {
        return _window.location.href.indexOf('/contentfrom/') > -1 ||
            document.getElementsByClassName('sponsor-name').length > 0;
      },
      getSponsor: function() {
        var elt = document.querySelector('.sponsor-name span');
        return elt ? elt.innerHTML : null;
      }
    }
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
  'hollywoodlife.com': [
    {
      example: 'http://hollywoodlife.com/pics/britney-spears-femme-fatale-tour-photos/',
      match: function() {
        return document.title.toLowerCase().indexOf('sponsored by') > -1;
      },
      getSponsor: function() {
        return null;
      }
    }
  ],
  'innovationinsights.wired.com': [
    {
      example: 'http://innovationinsights.wired.com/insights/2014/03/cloud-finding-way-fog/',
      match: function() {
        return true;
      },
      getSponsor: function() {
        return 'IBM';
      }
    }
  ],
  'latimes.com': [
    {
      example: 'http://www.latimes.com/brandpublishing/localplus/ucsandiego/la-ss-ucsd-playhouse-dto-story.html',
      match: function() {
        return _window.location.href.indexOf('/brandpublishing') > -1;
      },
      getSponsor: function() {
        return null;
      },
    },
  ],
  'lifehacker.com': [
    {
      example: 'http://lifehacker.com/5751962/gawker-artists-open-call-for-artists-and-exhibitors',
      match: function() {
        return document.getElementsByClassName('sponsored-label').length > 0;
      },
      getSponsor: function() {
        return null;
      },
    },
  ],
  'mashable.com': [
    {
      example: 'http://mashable.com/2013/03/12/dog-mans-best-friend/',
      match: function() {
        return _window.__o.content_source_type === 'Supported' ||
            _window.__o.content_source_type === 'Sponsored' ||
            _window.__o.topics.toLowerCase().indexOf('sponsored') > -1;
      },
      getSponsor: function() {
        var source = _window.__o.content_source_name;
        if (!source || source === 'Internal') {
          // Discard false positives.
          return null;
        }
        return source[0].toUpperCase() + source.slice(1);
      },
    },
  ],
  'newsweek.com': [
    {
      example: 'http://www.newsweek.com/10-best-personal-injury-attorneys',
      match: function() {
        return document.getElementsByClassName('sponsored-insight').length > 0;
      },
      getSponsor: function() {
        // Newsweek doesn't say; sometimes there are many sponsors for a single list.
        return null;
      },
    },
  ],
  'nydailynews.com': [
    {
      example: 'http://www.nydailynews.com/services/cuny-citizenship-immigration-centers-announce-expanded-summer-hours-article-1.1860540',
      match: function() {
        var elt = document.getElementById('a-credits');
        if (!elt) {
          return false;
        }
        return elt.innerHTML.indexOf('CONTENT SPONSORED') > -1;
      },
      getSponsor: function() {
        var elt = document.getElementById('a-credits');
        return elt ? elt.innerHTML.replace('CONTENT SPONSORED BY ', '') : null;
      },
    },
  ],
  'online.wsj.com': [
    {
      example: 'http://online.wsj.com/ad/article/narratives_brocade_67186.html?prx_t=cpIBAiqcBAu2QFA',
      match: function() {
        return _window.location.href.indexOf('/ad/') > -1;
      },
      getSponsor: function() {
        var elts = document.querySelectorAll('.author a');
        if (elts.length < 1) {
          return null;
        }
        return elts[0].innerHTML;
      },
    },
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
  'pando.com': [
    {
      example: 'http://pando.com/2013/03/01/you-shouldnt-be-bored-at-a-board-meeting-pt-2-structure-for-success/',
      match: function() {
        // Haven't figured out how to match their sponsored articles...
        return false;
      },
      getSponsor: function() {
        return null;
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
  'suntimes.com': [
    {
      example: 'http://www.suntimes.com/sponsored/28700806-816/live-music-for-every-palate-playing-all-summer-long.html',
      match: function() {
        return _window.location.href.indexOf('/sponsored/') > -1 ||
            document.getElementsByClassName('sponsored-heading').length > 0;
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
  'theawl.com': [
    {
      example: 'http://www.theawl.com/2012/06/bbcacopper',
      match: function() {
        return document.getElementsByClassName('tag-sponsored-content').length > 0;
      },
      getSponsor: function() {
        return null;
      }
    }
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
  'theverge.com': [
    {
      example: 'http://www.theverge.com/sponsored/intel-future-is-now',
      match: function() {
        return _window.location.href.indexOf('/sponsored/') > -1;
      },
      getSponsor: function() {
        return null;
      }
    }
  ],
  'thewrap.com': [
    {
      example: 'http://www.thewrap.com/mockup-secrets-leveraging-nycs-super-bowl-weekend-nyc-paramount-hotels-plan-sponsored-story/',
      match: function() {
        return _window.location.href.indexOf('sponsored-story') > -1;
      },
      getSponsor: function() {
        return null;
      }
    }
  ],
  'usatoday.com': [
    {
      example: 'http://www.usatoday.com/story/sponsor-story/dell/2014/05/13/dell-tablets-and-culture/9002541/',
      match: function() {
        return _window.location.href.indexOf('/sponsor-story/') > -1;
      },
      getSponsor: function() {
        return null;
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
        // Can also check for WP Brand Connect in URL, "left title-bar", or in title.
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
  ],
  'wired.com': [
    {
      example: 'http://www.wired.com/partners/netflix/',
      match: function() {
        return _window.location.href.indexOf('/partners/') > -1;
      },
      getSponsor: function() {
        return null;
      }
    }
  ],
  // For testing:
  'ianww.com': [
    {
      example: 'http://ianww.com/ad-detector/ad-test.html',
      match: function() {
        return _window.location.href.indexOf('ad-test') > -1;
      },
      getSponsor: function() {
        // Displayed sponsor should always be 'windowVar' to verify that we are
        // not in a sandboxed window.
        return _window.foo;
      },
    },
  ],
};
