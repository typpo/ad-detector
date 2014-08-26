'use strict';

var _window = typeof unsafeWindow === 'undefined' ? window : unsafeWindow;

/*
 * Rules for identifying ads on individual domains.
 *
 * example: Example URL that should trigger, used for testing.
 * match: Returns true if the current article is sponsored.
 * getSponsor: Returns the name of the sponsor. Null if unknown.
 *
 * Optional -
 * getCustomMessage: Returns a custom message to show on the warning banner.
 *
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
  'betabeat.com': [
    {
      example: 'http://betabeat.com/2013/03/vote-for-your-favorite-startups-the-pitch-lerer-ventures-softbank-capital/',
      match: function() {
        return classContains('rubric-block', 'Sponsored by');
      },
      getSponsor: function() {
        var elt = document.querySelector('.rubric-block a');
        return elt ? elt.innerHTML.replace('Sponsored by ', '') : null;
      }
    }
  ],
  'blogs.vancouversun.com': [
    {
      example: 'http://blogs.vancouversun.com/2014/03/12/cyberwarfare-expert-cancels-vancouver-talk-over-fear-of-revealing-critical-infrastructure-risks/',
      match: function() {
        return classAppears('tag-sponsored');
      },
      getSponsor: function() {
        return null;
      }
    }
  ],
  'business.time.com': [
    {
      example: 'http://business.time.com/2013/07/12/a-game-plan-for-the-future/',
      match: function() {
        return selectorAppears('#sponsor-banner');
      },
      getSponsor: function() {
        var elt = document.getElementById('sponsored-ad');
        return elt ? elt.innerHTML.replace('Sponsored by ', '') : null;
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
  'businessinsider.com': [
    {
      example: 'http://www.businessinsider.com/sc/music-city-pizza-owner-keith-hayman-interview-2014-7',
      match: function() {
        return urlContains('/sc/') || classAppears('tooltip-sponsor');
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
        return urlContains('/brandpublishing/');
      },
      getSponsor: function() {
        return null;
      },
    },
  ],
  'content.time.com': [
    {
      example: 'http://content.time.com/time/sponsoredarchive/landing/0,31909,1947800,00.html',
      match: function() {
        return urlContains('/sponsoredarchive/');
      },
      getSponsor: function() {
        return null;
      },
    },
  ],
  'curbed.com': [
    {
      example: 'http://curbed.com/archives/2014/04/09/more-nycinspired-apartment-essentials-from-gilt-home.php',
      match: function() {
        if (_window.POST_TAGS && _window.POST_TAGS instanceof Array) {
          return _window.POST_TAGS.indexOf('Sponsored Post') > -1;
        }
        return false;
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
        return classAppears('sponsored-label');
      },
      getSponsor: function() {
        return null;
      },
    },
  ],
  'denverpost.com': [
    {
      example: 'http://www.denverpost.com/tablehome/ci_14493215?source=rss',
      match: function() {
        var elt = document.getElementById('articleOverline');
        return urlContains('/sponsored') ||
          selectorContains('#articleOverline', 'SPONSORED CONTENT');
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
        // Testing .sponsored-flag results in false positives.
        return urlContains('/sponsored/');
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
        return classAppears('sponsoredBy');
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
  'finance.yahoo.com': [
    {
      example: 'https://finance.yahoo.com/news/global-cooling-real-inconvenient-truth-140500879.html',
      match: function() {
        return selectorAppears('img[alt="Accesswire"]');
      },
      getSponsor: function() {
        var elt = document.querySelectorAll('#mediacontentstory p');
        if (!elt) {
          return null;
        }
        return elt[elt.length - 1].children[0].nextSibling.textContent;
      },
      getCustomMessage: function() {
        return 'This page is a press release paid for by ' +
            this.getSponsor() + '.';
      },
    },
  ],
  'foodandwine.com': [
    {
      example: 'http://www.foodandwine.com/articles/lindt-falls-best-wine-pairings',
      match: function() {
        return classAppears('sponsor-info');
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
        return selectorAppears('.article_entity .brandvoice');
      },
      getSponsor: function() {
        return document.querySelector('.article_entity .brandvoice').innerHTML;
      },
    },
  ],
  'fortune.com': [
    {
      example: 'http://fortune.com/contentfrom/2014/07/01/Content-Marketing-A-Winner-on-Mobile/?ntv_a=0pABAL54BAfxgFA',
      match: function() {
        return urlContains('/contentfrom/') ||
          classAppears('sponsor-name');
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
        return classAppears('sponsored-label');
      },
      getSponsor: function() {
        return null;
      },
    },
  ],
  'gigaom.com': [
    {
      example: 'http://gigaom.com/2014/08/19/are-we-there-yet-it-teams-share-plans-and-concerns-with-saas/',
      match: function() {
        if (classAppears('sponsor-title')) {
          return true;
        }
        var elts = document.querySelectorAll('meta[property="article:tag"]');
        for (var i=0; i < elts.length; i++) {
          var elt = elts[i];
          if (elt.getAttribute('content') === 'Sponsored Content') {
            return true;
          }
        }
        return false;
      },
      getSponsor: function() {
        return null;
      },
    },
  ],
  'girlinthelittleredkitchen.com': [
    {
      example: 'http://girlinthelittleredkitchen.com/2014/07/avocado-tomato-feta-toast-poached-eggs/',
      match: function() {
        // This method of detection could be prone to false positives.
        return selectorContains('.post', 'sponsored by');
      },
      getSponsor: function() {
        return null;
      }
    }
  ],
  'homes.yahoo.com': [
    {
      example: 'https://homes.yahoo.com/photos/inside-innovation-brass-monkey-reinventing-photo-113000190.html',
      match: function() {
        return titleContains('Sponsored Content');
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
        return classAppears('sponsor_wrapper');
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
        return urlContains('/brandpublishing');
      },
      getSponsor: function() {
        return null;
      },
    },
  ],
  /*
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
  */
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
  'mediaite.com': [
    {
      example: 'http://www.mediaite.com/tv/nbcs-rock-center-with-brian-williams-something-for-everyone/',
      match: function() {
        return _window._sf_async_config.authors === 'SPONSORED CONTENT';
      },
      getSponsor: function() {
        var elt = document.getElementById('article-dek');
        return elt ? elt.innerHTML.replace('Content sponsored by ', '') : null;
      },
    },
  ],
  'money.msn.com': [
    {
      example: 'http://money.msn.com/small-business-smarts/transit-connect.aspx',
      match: function() {
        return titleContains('Sponsored by');
      },
      getSponsor: function() {
        return document.title.slice(document.title.indexOf('Sponsored by') + 13);
      },
    },
  ],
  'messages.people.com': [
    {
      example: 'http://messages.people.com/sponsored-post-jetblue/',
      match: function() {
        return true;
      },
      getSponsor: function() {
        return null;
      },
    },
  ],
  'newsweek.com': [
    {
      example: 'http://www.newsweek.com/10-best-personal-injury-attorneys',
      match: function() {
        return classAppears('sponsored-insight');
      },
      getSponsor: function() {
        // Newsweek doesn't say; sometimes there are many sponsors for a single list.
        return null;
      },
    },
  ],
  'nu.nl': [
    {
      example: 'http://www.nu.nl/advertorial-elektrisch-rijden/3845090/tankstation-vervangen-thuis-opladen.html',
      match: function() {
        return urlContains('/advertorial-');
      },
      getSponsor: function() {
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
  'nypost.com': [
    {
      example: 'http://nypost.com/dispatch/the-clubhouse/',
      match: function() {
        var elt = document.getElementById('article-dek');
        return elt ? elt.innerHTML.indexOf('sponsored by') > -1 : false;
      },
      getSponsor: function() {
        var elt = document.getElementById('article-dek');
        return elt ? elt.innerHTML.replace('Content sponsored by ', '') : null;
      },
    },
  ],
  'on.aol.com': [
    {
      example: 'http://on.aol.com/video/moviefone---young-adult---cast-interviews---high-school--sponsored-content--517219863',
      match: function() {
        return _window.location.href.indexOf('sponsored-content') > -1;
      },
      getSponsor: function() {
        return null;
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
  'pcworld.com': [
    {
      example: 'http://www.pcworld.com/article/2061962/android-keyboard-war-heats-up-as-swiftkey-and-swype-get-big-updates.html',
      match: function() {
        return document.getElementsByClassName('sponsored-by').length > 0;
      },
      getSponsor: function() {
        var elts = document.getElementsByClassName('brandpost-blurb');
        if (elts.length < 1) {
          return null;
        }
        return elts[0].innerHTML;
      },
    },
  ],
  'refinery29.com': [
    {
      example: 'http://www.refinery29.com/43774#slide',
      match: function() {
        var elts = document.getElementsByClassName('slideshow');
        if (elts.length < 1) {
          return null;
        }
        return elts[0].innerHTML.indexOf('sponsored by') > -1
      },
      getSponsor: function() {
        return null;
      },
    },
    {
      example: 'http://www.refinery29.com/cartier-sunglasses#slide',
      match: function() {
        return document.getElementsByClassName('sponsor-logo-secondary').length > 0;
      },
      getSponsor: function() {
        return null;
      },
    },
  ],
  'screen.yahoo.com': [
    {
      example: 'https://screen.yahoo.com/callaway-talks-phil-mickelson-u-140000616.html',
      match: function() {
        return document.title.indexOf('Sponsored Content') > -1;
      },
      getSponsor: function() {
        return null;
      },
    },
  ],
  'seventeen.com': [
    {
      example: 'http://www.seventeen.com/fashion/blog/sponsored-get-an-amazing-makeover-at-school',
      match: function() {
        return _window.location.href.indexOf('/sponsored-') > -1;
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
  'stylemepretty.com': [
    {
      example: 'http://www.stylemepretty.com/2014/08/19/alexandra-grecco-a-discount-a-giveaway-2/',
      match: function() {
        var elts = document.querySelectorAll('a[rel="tag"]');
        for (var i=0; i < elts.length; i++) {
          var elt = elts[i];
          if (elt.innerHTML === 'Sponsored Posts') {
            return true;
          }
        }
        return false;
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
        return _window.location.href.indexOf('/sponsored/') > -1 ||
          document.getElementsByClassName('sponsor-warning').length > 0;
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
  'thekitchn.com': [
    {
      example: 'http://www.thekitchn.com/recipe-paradise-punch-recipes-from-the-kitchn-205103',
      match: function() {
        return document.getElementsByClassName('sponsored-post').length > 0;
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
  'tweakers.net': [
    {
      example: 'http://tweakers.net/advertorials/werkenbijns',
      match: function() {
        return _window.location.href.indexOf('/advertorials/') > -1;
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
  'venturebeat.com': [
    {
      example: 'http://venturebeat.com/2013/01/31/create-and-design-websites-on-your-pc-with-coffeecup-vb-store/',
      match: function() {
        return document.getElementsByClassName('partnered-post').length > 0;
      },
      getSponsor: function() {
        var elts = document.getElementsByClassName('the-author');
        if (elts.length < 1) {
          return null;
        }
        return elts[0].innerHTML;
      }
    }
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
        return selectorContains('body', 'trigger');
      },
      getSponsor: function() {
        // Displayed sponsor should always be 'windowVar' to verify that we are
        // not in a sandboxed window.
        return _window.foo;
      },
    },
  ],
};


/** Common utility functions **/
function urlContains(s) {
  return _window.location.href.indexOf(s) > -1;
}

function titleContains(s) {
  return document.title.indexOf(s) > -1;
}

function classAppears(className) {
  return document.getElementsByClassName(className).length > 0;
}

function selectorAppears(selector) {
  return document.querySelector(selector) !== null;
}

function classContains(className, text) {
  var elts = document.getElementsByClassName(className);
  return elts.length > 0 ? elts[0].innerHTML.indexOf(text) > -1 : false
}

function selectorContains(selector, text) {
  var elt = document.querySelector(selector);
  return elt ? elt.innerHTML.indexOf(text) > -1 : false
}
