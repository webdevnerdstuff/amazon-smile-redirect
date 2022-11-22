const config = require('../json/config.json');

// ---------------------------------------------------- Get Storage //
chrome.storage.local.get(['extensionStatus'], (result) => {
	fetchNavLines(result.extensionStatus);

	return false;
});

// ---------------------------------------------------- Check for Excluded Pages //
function isExcludedPage() {
	const href = window.location.href;
	let exclude = false;

	Object.values(config.excludedSites).forEach((elm) => {
		if (href.includes(elm)) {
			exclude = true;
		}
	});

	return exclude;
}

// ---------------------------------------------------- Checked if Logged Out //
function loggedOut(navLineText) {
	const lowerNavLineText = navLineText.toLowerCase();

	return lowerNavLineText === 'hello. sign in' || lowerNavLineText === 'hello, sign in' || lowerNavLineText === 'hallo! anmelden' || lowerNavLineText === 'hallo, anmelden' || lowerNavLineText === '';
}

// ---------------------------------------------------- Go To Page //
function goToPage(navLineText, domainExtension, goToLogin, onlyWhenLoggedInStatus, onlyWhenCheckingOutStatus) {
	if (!isExcludedPage()) {
		const pathName = window.location.pathname;
		let checkoutPage = false;

		if (onlyWhenCheckingOutStatus === 'enabled') {
			checkoutPage = true;
		}

		// Redirect if logged in, or on the checkout page //
		if ((!loggedOut(navLineText) && !goToLogin) || checkoutPage) {
			// Check if on page checkout is enabled, and if it is not the checkout page //
			if (onlyWhenCheckingOutStatus === 'enabled' && !pathName.includes('gp/buy')) {
				return false;
			}

			// Redirect user to corresponding page on Amazon Smile //
			window.location.replace(`https://smile.amazon.${domainExtension}${window.location.pathname}${window.location.search}`);
		}
		else if (onlyWhenLoggedInStatus !== 'enabled' && goToLogin) {
			// Redirect user to login page with return_to URL //
			const redirectURL = encodeURIComponent(`https://smile.amazon.${domainExtension}${pathName}`);
			const redirectSearch = encodeURIComponent(window.location.search);

			if (window.location.hostname === 'www.amazon.com') {
				window.location.replace(
					`https://smile.amazon.${domainExtension}/ap/signin?_encoding=UTF8&openid.assoc_handle=usflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid.return_to=${redirectURL}${redirectSearch}`,
				);
			}
			else if (window.location.hostname === 'www.amazon.co.uk') {
				window.location.replace(
					`https://smile.amazon.${domainExtension}/ap/signin?_encoding=UTF8&ignoreAuthState=1&openid.assoc_handle=gbflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid.return_to=${redirectURL}${redirectSearch}`,
				);
			}
			else if (window.location.hostname === 'www.amazon.de') {
				window.location.replace(
					`https://smile.amazon.${domainExtension}/ap/signin?_encoding=UTF8&ignoreAuthState=1&openid.assoc_handle=deflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid.return_to=${redirectURL}${redirectSearch}`,
				);
			}
		}
	}

	return false;
}

// ---------------------------------------------------- Fetch Nav Lines //
function fetchNavLines(extensionStatus) {
	const navTools = document.getElementById('nav-tools');
	const domainExtension = window.location.host.split('.amazon.')[1];
	let navLines = '';
	let navLineText = '';

	if (extensionStatus === 'disabled') {
		return false;
	}

	if (navTools) {
		navLines = navTools.getElementsByClassName('nav-line-1') || '';

		for (let i = 0; i < navLines.length; i += 1) {
			if (
				navLines[i].innerText.includes('Hello.') ||
				navLines[i].innerText.includes('Hello,') ||
				navLines[i].innerText.includes('Hallo!') ||
				navLines[i].innerText.includes('Hallo,')
			) {
				navLineText = navLines[i].innerText;

				break;
			}
		}
	}

	chrome.runtime.sendMessage({ logOutCheck: true, loggedOut: loggedOut(navLineText) }, (response) => {
		goToPage(navLineText, domainExtension, response.goToLogin, response.onlyWhenLoggedInStatus, response.onlyWhenCheckingOutStatus);
	});

	return false;
}
