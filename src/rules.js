'use strict';

var _window = typeof unsafeWindow === 'undefined' ? window : unsafeWindow;

/*
 * Rules for identifying ads on individual domains.
 *
 * example: Example URL that should trigger, used for testing.
 * match: Returns true if the current article is sponsored.
 *
 * Optional -
 * getSponsor: Returns the name of the sponsor. Null if unknown.
 * getCustomMessage: Returns a custom message to show on the warning banner.
 * shouldRootDomainTrigger: True if we expect the root domain to trigger the
 *    banner. Otherwise it is considered a false positive during testing.
 */
_window.AD_DETECTOR_RULES = {
  'ad-assets.nytimes.com': [
    {
      example: 'http://ad-assets.nytimes.com/paidpost/dell/will-millennials-ever-completely-shun-the-office.html',
      match: function() {
        return true;
      },
      shouldRootDomainTrigger: true,
      getSponsor: function() {
        var paidElts = document.getElementsByClassName('paid-head-tag');
        if (paidElts.length < 1) {
          return null;
        }
        return paidElts[0].innerHTML.replace('PAID FOR AND POSTED BY ', '');
      },
    },
  ],
  'adformatie.nl': [
    {
      example: 'https://www.adformatie.nl/advertorial/met-de-reclamefolder-app-op-stap',
      match: function() {
        return urlContains('/advertorial/');
      },
    },
  ],
  'arstechnica.com': [
    {
      example: 'http://arstechnica.com/sponsored/it-consumption-model-interactive-infographic/',
      match: function() {
        return urlContains('/sponsored/');
      },
    },
  ],
  'bbc.com': [
    {
      example: 'http://www.bbc.com/travel/sponsored/feature/20130925-putting-the-romance-in-adventure-travel',
      match: function() {
        return urlContains('/sponsored/');
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
  'bizjournals.com': [
    {
      example: 'http://www.bizjournals.com/houston/bizwomen/channels/pnc/2014/08/for-businesses-green-is-here-to-stay.html',
      match: function() {
        return selectorContains('.article .meta-item', 'Sponsor Content');
      },
      getSponsor: function() {
        return document.querySelector('.article__byline').firstChild.textContent.replace('Sponsor post from ', '');
      }
    }
  ],
  'blogs.vancouversun.com': [
    {
      example: 'http://blogs.vancouversun.com/2014/03/12/cyberwarfare-expert-cancels-vancouver-talk-over-fear-of-revealing-critical-infrastructure-risks/',
      match: function() {
        return classAppears('tag-sponsored');
      },
    }
  ],
  'bloomberg.com': [
    {
      example: 'http://www.bloomberg.com/native/article/?mvi=8a0a327343df4ca0b503d03a93deebd2',
      match: function() {
        return urlContains('/native/');
      },
    }
  ],
  'bostonmagazine.com': [
    {
      example: 'http://www.bostonmagazine.com/sponsor-content/healthy/',
      match: function() {
        return urlContains('/sponsor-content/');
      },
    }
  ],
  'business.financialpost.com': [
    {
      example: 'http://business.financialpost.com/2013/06/26/a-joint-venture-with-capp-oil-industry-set-to-grow/?__lsa=95bf-d411',
      match: function() {
        return selectorContains('#npContentMain .big-sponsored-label', 'Sponsored');
      },
      getSponsor: function() {
        return document.querySelector('.big-sponsored-label').textContent
            .replace('Sponsored by ', '');
      },
    },
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
        var elts = document.getElementsByClassName('byline__title');
        if (elts.length > 0) {
          return elts[0].innerHTML.indexOf('Brand Publisher') > -1;
        }
        return false;
      },
      getSponsor: function() {
        var elts = document.getElementsByClassName('byline__author');
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
        return urlContains('/sc/');
      },
    },
  ],
  'canadianfamily.ca': [
    {
      example: 'http://www.canadianfamily.ca/kids/baby/your-guide-to-baby-massage-sponsored/',
      match: function() {
        return urlContains('-sponsored/');
      },
    },
  ],
  'chicagotribune.com': [
    {
      example: 'http://www.chicagotribune.com/brandpublishing/seniorhousingguide/',
      match: function() {
        return urlContains('/brandpublishing/');
      },
    },
  ],
  'content.time.com': [
    {
      example: 'http://content.time.com/time/sponsoredarchive/landing/0,31909,1947800,00.html',
      match: function() {
        return urlContains('/sponsoredarchive/');
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
    },
  ],
  'deadspin.com': [
    {
      example: 'http://deadspin.com/5969545/exclusive-could-this-be-chris-pauls-secret-twin-brother',
      match: function() {
        return selectorAppears('.content-wrapper .sponsored-label');
      },
    },
  ],
  'denverpost.com': [
    {
      example: 'http://www.denverpost.com/tablehome/ci_14493215?source=rss',
      match: function() {
        var elt = document.getElementById('articleOverline');
        return urlContains('/sponsored') || titleContains('SPONSORED') ||
          selectorContains('#articleOverline', 'SPONSORED CONTENT');
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
  'dnainfo.com': [
    {
      example: 'http://www.dnainfo.com/new-york/sponsor-story/?mvi=8ca5f068f5b249b88f359b7dcc8ca6a0',
      match: function() {
        return urlContains('/sponsor-story/');
      },
    },
  ],
  'ew.com': [
    {
      example: 'http://www.ew.com/ew/gallery/0,,20308916_20447484_20885831,00.html',
      match: function() {
        return classAppears('sponsoredBy');
      },
    },
  ],
  'fastcompany.com': [
    {
      example: 'http://www.fastcompany.com/3002725/infographic-upss-2012-change-supply-chain-survey',
      match: function() {
        return _window.bootstrap_obj ? _window.bootstrap_obj.sponsored : false;
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
        return 'This article is a press release paid for by ' +
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
    },
  ],
  'foodrepublic.com': [
    {
      example: 'http://www.foodrepublic.com/2014/05/15/whimsical-grilling-leif-hedendal',
      match: function() {
        return selectorContains('.node-type-story .rubric a', 'Sponsored Post');
      },
    },
  ],
  'foodnetwork.com': [
    {
      example: 'http://www.foodnetwork.com/recipes/orange-sorbet-recipe.html?COUPON=07-0094-01&bid=847241',
      match: function() {
        return selectorContains('.lead-overview .copyright', 'Sponsor Recipe');
      },
      getSponsor: function() {
        return document.querySelector('.lead-overview .copyright').textContent
            .replace('Sponsor Recipe Courtesy of ', '');
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
        return selectorAppears('.content-wrapper .sponsored-label');
      },
    },
  ],
  'gearpatrol.com': [
    {
      example: 'http://gearpatrol.com/2014/08/04/nobody-wins-counterfeit-batteries/',
      match: function() {
        return classContains('orange-box', 'Sponsored Post');
      },
    },
  ],
  'gigaom.com': [
    {
      example: 'http://gigaom.com/2014/08/19/are-we-there-yet-it-teams-share-plans-and-concerns-with-saas/',
      match: function() {
        var elts = document.querySelectorAll('meta[property="article:tag"]');
        for (var i=0; i < elts.length; i++) {
          var elt = elts[i];
          if (elt.getAttribute('content') === 'Sponsored Content') {
            return true;
          }
        }
        return false;
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
    }
  ],
  'gothamist.com': [
    {
      example: 'http://gothamist.com/2014/06/16/opposites_attract_the_best_nyc_date_1.php',
      match: function() {
        return document.querySelector('#entry-content ' +
                'a[href="/tags/gothamistcollaboration"]') !== null &&
                selectorContains('.byline .author', 'Sponsor');
      },
    },
  ],
  'homes.yahoo.com': [
    {
      example: 'https://homes.yahoo.com/photos/inside-innovation-brass-monkey-reinventing-photo-113000190.html',
      match: function() {
        return titleContains('Sponsored Content');
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
    }
  ],
  'inc.com': [
    {
      example: 'http://www.inc.com/theupsstore/index.html',
      match: function() {
        return selectorAppears('#cobrand');
      },
    }
  ],
  'innovationinsights.wired.com': [
    {
      example: 'http://innovationinsights.wired.com/insights/2014/03/cloud-finding-way-fog/',
      match: function() {
        return true;
      },
      shouldRootDomainTrigger: true,
      getSponsor: function() {
        return 'IBM';
      },
    }
  ],
  'latimes.com': [
    {
      example: 'http://www.latimes.com/brandpublishing/localplus/ucsandiego/la-ss-ucsd-playhouse-dto-story.html',
      match: function() {
        return urlContains('/brandpublishing/');
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
  'marketwatch.com': [
    {
      example: 'http://www.marketwatch.com/ad/article/narratives?prx_t=RpABA5q0BAICAFA&prx_q=8163',
      match: function() {
        return urlContains('/ad/');
      },
      getSponsor: function() {
        return document.querySelector('.author a').textContent;
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
  'medium.com': [
    {
      example: 'https://medium.com/re-form/simcity-that-i-used-to-know-d5d8c49e3e1d',
      match: function() {
        return urlContains('/re-form/');
      },
      getSponsor: function() {
        return 'BMW';
      },
    },
  ],
  'messages.people.com': [
    {
      example: 'http://messages.people.com/sponsored-post-jetblue/',
      match: function() {
        return true;
      },
      shouldRootDomainTrigger: true,
    },
  ],
  'mic.com': [
    {
      example: 'http://mic.com/articles/96860/two-engineers-have-created-the-doll-every-young-girl-should-be-playing-with',
      match: function() {
        return selectorAppears('article section .spon-image');
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
    {
      example: 'http://money.msn.com/business-news/article.aspx?feed=PR&date=20140825&id=17882267',
      match: function() {
        return urlContains('feed=PR&');
      },
      getCustomMessage: function() {
        return 'This article is a press release paid for by a corporation.';
      },
    },
  ],
  'msnbc.com': [
    {
      example: 'http://www.msnbc.com/msnbc/landfill-fuels-frances-energy-future',
      match: function() {
        return selectorAppears('.content .pane-native-ad-sponsor');
      },
    },
  ],
  'newrepublic.com': [
    {
      example: 'http://www.newrepublic.com/article/118883/millennials-dont-want-climb-traditional-career-ladder',
      match: function() {
        return selectorContains('.story .category', 'Sponsored Content');
      },
      getSponsor: function() {
        return document.querySelector('.body .introduction').textContent.trim()
            .replace('Sponsored by ', '');
      },
    },
  ],
  'newsweek.com': [
    {
      example: 'http://www.newsweek.com/10-best-personal-injury-attorneys',
      match: function() {
        return classAppears('sponsored-insight');
      },
    },
  ],
  'nu.nl': [
    {
      example: 'http://www.nu.nl/advertorial-elektrisch-rijden/3845090/tankstation-vervangen-thuis-opladen.html',
      match: function() {
        return urlContains('/advertorial-');
      },
    },
  ],
  'nydailynews.com': [
    {
      example: 'http://www.nydailynews.com/services/cuny-citizenship-immigration-centers-announce-expanded-summer-hours-article-1.1860540',
      match: function() {
        return selectorContains('#a-credits', 'CONTENT SPONSORED');
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
        return selectorContains('#article-dek', 'sponsored by');
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
        return urlContains('sponsored-content');
      },
    },
  ],
  'online.wsj.com': [
    {
      example: 'http://online.wsj.com/ad/article/narratives_brocade_67186.html?prx_t=cpIBAiqcBAu2QFA',
      match: function() {
        return urlContains('/ad/');
      },
      getSponsor: function() {
        var elts = document.querySelectorAll('.author a');
        if (elts.length < 1) {
          return null;
        }
        return elts[0].innerHTML;
      },
    },
    {
      example: 'http://online.wsj.com/article/PR-CO-20140825-913551.html',
      match: function() {
        return classContains('articleSection', 'PRESS RELEASE');
      },
      getCustomMessage: function() {
        return 'This article is a press release paid for by a corporation.';
      },
    },
  ],
  'paidpost.nytimes.com': [
    {
      example: 'http://paidpost.nytimes.com/vacheron-constantin/transmitting-craftsmanship.html',
      match: function() {
        return true;
      },
      shouldRootDomainTrigger: true,
      getSponsor: function() {
        var paidElts = document.getElementsByClassName('paid-top-border-txt');
        if (paidElts.length < 1) {
          return null;
        }
        return paidElts[0].innerHTML.replace('PAID FOR AND POSTED BY ', '');
      },
    },
  ],
  // Unfortunately, I can't find a way to match Pando's sponsored articles...
  /*
  'pando.com': [
    {
      example: 'http://pando.com/2013/03/01/you-shouldnt-be-bored-at-a-board-meeting-pt-2-structure-for-success/',
      match: function() {
        return false;
      },
    },
  ],
  */
  'pcworld.com': [
    {
      example: 'http://www.pcworld.com/article/2061962/android-keyboard-war-heats-up-as-swiftkey-and-swype-get-big-updates.html',
      match: function() {
        return classAppears('sponsored-by');
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
  'phillymag.com': [
    {
      example: 'http://www.phillymag.com/sponsor-content/grilling-gets-healthy-makeover/',
      match: function() {
        return urlContains('/sponsor-content/');
      },
      getSponsor: function() {
        return document.querySelector('.presented-by').textContent
            .replace('Presented by ', '');
      },
    },
  ],
  'pioneerlocal.suntimes.com': [
    {
      example: 'http://pioneerlocal.suntimes.com/sponsored/?post=1486-What%20are%20the%20possible%20causes%20of%20your%20ankle%20pain%3F&sponsor=342412-Hinsdale%20Foot%20%26%20Ankle',
      match: function() {
        return urlContains('/sponsored/');
      },
    },
  ],
  'politico.com': [
    {
      example: 'http://www.politico.com/magazine/sponsor-content/2014/07/to-save-detroit-start-small/#.U9fGvoBdVv0',
      match: function() {
        return urlContains('/sponsor-content/');
      },
    },
  ],
  'politiken.dk': [
    {
      example: 'http://politiken.dk/annoncesektion/ibm/ECE2192847/digital-bodyguard-beskytter-mod-identitetstyveri/',
      match: function() {
        return urlContains('/annoncesektion/');
      },
      getSponsor: function() {
        var paidElts = document.getElementsByClassName('disclaimer');
        if (paidElts.length < 1) {
          return null;
        }
        return paidElts[0].innerHTML.replace('Annoncørindhold fra ', '');
      },
    },
  ],
  'prnewswire.com': [
    {
      example: 'http://www.prnewswire.com/news-releases/urban-tours-offer-fun-for-foodies-272620221.html',
      match: function() {
        return urlContains('/news-releases/');
      },
      getSponsor: function() {
        return document.querySelector('meta[name="author"]').getAttribute('content');
      },
      getCustomMessage: function() {
        return 'This article is a press release paid for by ' + this.getSponsor();
      },
    },
  ],
  'qz.com': [
    {
      example: 'http://qz.com/241614/reducing-indias-dependence-on-foreign-oil-and-gas/',
      match: function() {
        return selectorContains('.view #items .kicker', 'Sponsor Content');
      },
    },
  ],
  // They just show an image, so there's no easy way to tell.
  /*
  'readwrite.com': [
    {
      example: 'http://readwrite.com/2014/03/14/api-explainer-intel#awesm=~oDCS7ICV27l5BC',
      match: function() {
        return false;
      },
    },
  ],
  */
  'recode.net': [
    {
      example: 'http://recode.net/sponsored-content/the-future-of-content-its-a-journey-not-a-destination/',
      match: function() {
        return urlContains('/sponsored-content/');
      },
    },
  ],
  'refinery29.com': [
    {
      example: 'http://www.refinery29.com/43774#slide',
      match: function() {
        return classContains('slideshow', 'sponsored by');
      },
    },
    {
      example: 'http://www.refinery29.com/cartier-sunglasses#slide',
      match: function() {
        return classAppears('sponsor-logo-secondary');
      },
    },
  ],
  'rtlnieuws.nl': [
    {
      example: 'http://www.rtlnieuws.nl/economie/indexbeleggen/beleggen-aandelen-zo-kan-het-ook-advertorial',
      match: function() {
        return urlContains('-advertorial') || urlContains('/sponsored-special/');
      },
    },
  ],
  'screen.yahoo.com': [
    {
      example: 'https://screen.yahoo.com/callaway-talks-phil-mickelson-u-140000616.html',
      match: function() {
        return titleContains('Sponsored Content');
      },
    },
  ],
  'seventeen.com': [
    {
      example: 'http://www.seventeen.com/fashion/blog/sponsored-get-an-amazing-makeover-at-school',
      match: function() {
        return urlContains('/sponsored-');
      },
    },
  ],
  'sponsored.postandcourier.com': [
    {
      example: 'http://sponsored.postandcourier.com/palmetto-place/',
      match: function() {
        return true;
      },
      shouldRootDomainTrigger: true,
    },
  ],
  'slate.com': [
    {
      example: 'http://www.slate.com/articles/news_and_politics/uc/2014/06/living_forever_the_right_way.html',
      match: function() {
        return classAppears('provided-by');
      },
    },
  ],
  'studioatgawker.kinja.com': [
    {
      example: 'http://studioatgawker.kinja.com/new-technology-will-set-your-previously-pc-bound-games-1620845289',
      match: function() {
        return true;
      },
      shouldRootDomainTrigger: true,
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
    },
  ],
  'suntimes.com': [
    {
      example: 'http://www.suntimes.com/sponsored/28700806-816/live-music-for-every-palate-playing-all-summer-long.html',
      match: function() {
        return urlContains('/sponsored/') || classAppears('sponsored-heading');
      },
    },
  ],
  'talkingpointsmemo.com': [
    {
      example: 'http://talkingpointsmemo.com/idealab-impact/medicare-partd-affordable-drug-coverage',
      match: function() {
        return titleContains('[Sponsored Message]');
      },
      getSponsor: function() {
        return document.querySelector('.main .byline-content').textContent;
      },
    },
  ],
  'theatlantic.com': [
    {
      example: 'http://www.theatlantic.com/sponsored/ibm-big-data/big-data-grows-new-role-emerges-chief-data-officer/102/',
      match: function() {
        return urlContains('/sponsored/') || classAppears('sponsor-warning');
      },
    },
  ],
  'theawl.com': [
    {
      example: 'http://www.theawl.com/2012/06/bbcacopper',
      match: function() {
        return classAppears('tag-sponsored-content');
      },
    }
  ],
  'thebolditalic.com': [
    {
      example: 'http://www.thebolditalic.com/articles/6150-tomorrow-late-night-bart-could-be-even-closer',
      match: function() {
        var elts = document.querySelectorAll('.copy p');
        if (elts.length > 0) {
          return elts[elts.length - 1].innerHTML.indexOf('was paid for by') > -1;
        }
      },
    },
    {
      example: 'http://www.thebolditalic.com/articles/6220-plumb-a-company-for-all-you-notebook-lovers',
      match: function() {
        var elts = document.querySelectorAll('.tags li');
        for (var i=0; i < elts.length; i++) {
          if (elts[i].innerHTML.indexOf('Sponsored') > -1) {
            return true;
          }
        }
        return false;
      },
    }
  ],
  'thedailybeast.com': [
    {
      example: 'http://www.thedailybeast.com/articles/2014/09/30/how-we-compute-flexible-hardware-required.html',
      match: function() {
        return selectorAppears('article[data-index="1"] .partnerad');
      },
      getSponsor: function() {
        return document.querySelector('article[data-index="1"] .article-main-content .section').textContent;
      },
    }
  ],
  'theguardian.com': [
    {
      example: 'http://www.theguardian.com/sustainable-business/2014/jul/18/ben-jerry-turn-ice-cream-into-energy',
      match: function() {
        return selectorAppears('meta[property="article:tag"][content*="Partner zone"]');
      },
    }
  ],
  'thekitchn.com': [
    {
      example: 'http://www.thekitchn.com/recipe-paradise-punch-recipes-from-the-kitchn-205103',
      match: function() {
        return classAppears('sponsored-post');
      },
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
  'thestar.com': [
    {
      example: 'http://www.thestar.com/sponsored_sections/dailyhealth.html',
      match: function() {
        return urlContains('/sponsored_sections/');
      },
    }
  ],
  'theverge.com': [
    {
      example: 'http://www.theverge.com/sponsored/intel-future-is-now',
      match: function() {
        return urlContains('/sponsored/') || selectorAppears('h3.sbnu-sponsored-title-bar');
      },
    }
  ],
  'thewrap.com': [
    {
      example: 'http://www.thewrap.com/mockup-secrets-leveraging-nycs-super-bowl-weekend-nyc-paramount-hotels-plan-sponsored-story/',
      match: function() {
        return urlContains('sponsored-story');
      },
    }
  ],
  'thoughtcatalog.com': [
    {
      example: 'http://thoughtcatalog.com/thought-catalog-sponsored-posts/2014/07/23-incredible-summer-photos-that-will-make-you-book-your-vacation-tomorrow/',
      match: function() {
        return urlContains('/thought-catalog-sponsored-posts/');
      },
    }
  ],
  // Omitting this for now, because paid articles are always included with
  // normal articles, making them very difficult to detect (unless we check on
  // scroll).
  /*
  'tribtalk.org': [
    {
      example: 'http://tribtalk.org/2014/07/30/fixing-whats-wrong-with-testing-in-k-12-education/',
      match: function() {
        return selectorAppears('.category-paid-placement .byline');
      },
    }
  ],
  */
  'timesunion.com': [
    {
      example: 'http://www.timesunion.com/sponsoredarticles/adv/?prx_t=+Z0BA+OUBAgw4FA',
      match: function() {
        return urlContains('/sponsoredarticles/');
      },
    }
  ],
  'tweakers.net': [
    {
      example: 'http://tweakers.net/advertorials/werkenbijns',
      match: function() {
        return urlContains('/advertorials/');
      },
    }
  ],
  'upworthy.com': [
    {
      example: 'https://www.upworthy.com/30-seconds-of-women-over-apologizing-followed-by-30-seconds-of-them-so-destroying-that-stereotype',
      match: function() {
        return selectorAppears('.sponsored-section #promoted-header');
      },
    },
  ],
  'usatoday.com': [
    {
      example: 'http://www.usatoday.com/story/sponsor-story/dell/2014/05/13/dell-tablets-and-culture/9002541/',
      match: function() {
        return urlContains('/sponsor-story/');
      },
    },
  ],
  'vanityfair.com': [
    {
      example: 'http://www.vanityfair.com/online/oscars/2013/12/hennessy-sir-malcolm-campbell-speed-racer',
      match: function() {
        return classContains('rubric', 'SPONSOR CONTENT');
      },
    },
  ],
  'venturebeat.com': [
    {
      example: 'http://venturebeat.com/2013/01/31/create-and-design-websites-on-your-pc-with-coffeecup-vb-store/',
      match: function() {
        return classAppears('partnered-post') && !classAppears('entry-summary');
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
  'vice.com': [
    {
      example: 'http://www.vice.com/ketelone/modern-craftsmen-gregory-laketek',
      match: function() {
        return urlContains('/ketelone/');
      },
    }
  ],
  'volkskrant.nl': [
    {
      example: 'http://www.volkskrant.nl/vk/nl/11630/Advertorial-Donorweek/index.dhtml',
      match: function() {
        return urlContains('/Advertorial');
      },
    },
  ],
  'vox.com': [
    {
      example: 'http://www.vox.com/sponsored/goldman-sachs-naes/episode-1-the-north-american-energy-opportunity',
      match: function() {
        return urlContains('/sponsored/');
      },
    }
  ],
  'washingtonpost.com': [
    {
      example: 'http://www.washingtonpost.com/sf/brand-connect/wp/enterprise/one-year-later-a-commitment-renewed/',
      match: function() {
        // TODO Can also check for WP Brand Connect in URL, "left title-bar", or in title
        return selectorContains('.bylines .byline .byline-title',
                                'Sponsor Generated Content');
      },
    }
  ],
  'wired.com': [
    {
      example: 'http://www.wired.com/partners/netflix/',
      match: function() {
        return urlContains('/partners/');
      },
    }
  ],
  'xojane.com': [
    {
      example: 'http://www.xojane.com/we-were-paid-for-this/my-favorite-things-lasvegas-day',
      match: function() {
        return urlContains('/we-were-paid-for-this/');
      },
    }
  ],
  'yahoo.com': [
    {
      example: 'https://www.yahoo.com/tech/spark-ignites-match-how-sam-yagan-became-the-dominant-a81624092647.html',
      match: function() {
        return selectorContains('.byline .attribution-name', 'Brought to you by');
      },
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
