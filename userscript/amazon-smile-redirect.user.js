// ==UserScript==
// @name       	Amazon Smile Redirect
// @namespace  	http://www.mikevision.com/
// @version    	1.1
// @description This script will automatically redirect you to the corresponding smile.amazon.com page.
// @include 		http://www.amazon.com/*
// @include     http://www.amazon.co.uk/*
// @include 		http://www.amazon.de/*
// @include     https://www.amazon.com/*
// @include     https://www.amazon.co.uk/*
// @include     https://www.amazon.de/*
// @exclude     http://smile.amazon.com/*
// @exclude     http://smile.amazon.co.uk/*
// @exclude 		http://smile.amazon.de/*
// @exclude     https://smile.amazon.com/*
// @exclude     https://smile.amazon.co.uk/*
// @exclude 		https://smile.amazon.de/*
// @exclude     https://www.amazon.com/ap/*
// @exclude     https://www.amazon.co.uk/ap/*
// @exclude 		https://www.amazon.de/ap/*
// @exclude     https://www.amazon.com/gp/css/*
// @exclude     https://www.amazon.co.uk/gp/css/*
// @exclude 		https://www.amazon.de/gp/css/*
// @copyright  	2014+
// @updateURL 	https://openuserjs.org/meta/mscarchilli/Amazon_Smile_Redirect.meta.js
// @downloadURL https://openuserjs.org/install/mscarchilli/Amazon_Smile_Redirect.user.js
// @icon 				http://www.amazon.com/favicon.ico
// @grant       none
// @license     MIT
// ==/UserScript==



// Check to see if #nav-tools exists to check if user is logged in //
var navTools = document.getElementById('nav-tools');
var navLine;
var navlineText;

if (typeof(navTools) !== 'undefined' && navTools != null) {
  fetchNavLines();
}

// Fetch nav-line-1 elms //
function fetchNavLines() {
  var navLines        = navTools.getElementsByClassName('nav-line-1');
  var domainExtension = window.location.host.split('.amazon.')[1];

  for ( var i = 0; i < navLines.length; i++ )
  {
    if (navLines[i].innerHTML.includes( 'Hello.') || navLines[i].innerHTML.includes( 'Hallo!'))
    {
      navLine     = navLines[i];
      navlineText = navLines[i].innerHTML;

      break;
    }
  }

  // Redirect user to corresponding page on Amazon Smile //
  if (navlineText !== "Hello. Sign in" || navlineText !== 'Hallo! Anmelden') {
    window.location.replace('https://smile.amazon.' + domainExtension + window.location.pathname + location.search);
  }
  // Redirect user to login page with return_to URL //
  else {
    var redirectURL     = encodeURIComponent('https://smile.amazon.' + domainExtension + window.location.pathname);
    var redirectSearch  = encodeURIComponent(location.search);

    if ( window.location.hostname == "www.amazon.com" ) {
      window.location.replace('https://www.amazon.' + domainExtension + '/ap/signin?_encoding=UTF8&openid.assoc_handle=usflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid.return_to=' + redirectURL + redirectSearch);
    }
    else if ( window.location.hostname == "www.amazon.co.uk" ) {
      window.location.replace('https://www.amazon.' + domainExtension + '/ap/signin?_encoding=UTF8&ignoreAuthState=1&openid.assoc_handle=gbflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid.return_to=' + redirectURL + redirectSearch);
    }
    else if ( window.location.hostname == "www.amazon.de" ) {
      window.location.replace('https://www.amazon.' + domainExtension + '/ap/signin?_encoding=UTF8&ignoreAuthState=1&openid.assoc_handle=deflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid.return_to=' + redirectURL + redirectSearch);
    }
  }
}
