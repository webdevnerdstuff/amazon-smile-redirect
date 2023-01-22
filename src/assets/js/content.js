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

// ---------------------------------------------------- Final Notification //
let finalNotificationDiv = null;

// ! Used to remove the final notification for testing //
// chrome.storage.local.remove('asr-final-notification');

function closeFinalNotification() {
	chrome.storage.local.set({ 'asr-final-notification': 'true' }, () => {
		finalNotificationDiv.remove();
	});
}

chrome.storage.local.get(['asr-final-notification'], (result) => {
	// console.log({ result });

	if (result['asr-final-notification'] === 'true') {
		return false;
	}

	const colorRed = '#b22222';
	const finalNotificationCopy = `
<div style="
width: 400px;
color: ${colorRed};
display: block;
font-weight: bold;
font-size: 1.4em;
margin: 0 auto;
text-align: center;
text-transform: uppercase;
">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 506.57 88.81" data-v-734fee71="" style="margin-bottom: 5px; max-height: 100px;"><path class="asr-logo-text" d="M103.83,381.25l-2-6.54H92l-2,6.54H83.52l10.11-28.71h6.84l10.11,28.71Zm-10.53-11h7.21l-3.64-12Z" transform="translate(-55.79 -329.38)" fill="#232f3e"></path><path class="asr-logo-text" d="M140,381.25V366.92q0-2.82-2.52-2.82a10.47,10.47,0,0,0-4.52,1.08v16.07h-6V366.92c0-1.88-.84-2.82-2.53-2.82a10.15,10.15,0,0,0-4.55,1.12v16h-6V360.08h5l.54,2a18.1,18.1,0,0,1,4-2.05,11.23,11.23,0,0,1,3.63-.6c2.49,0,4.24.89,5.26,2.65a17.64,17.64,0,0,1,4-2,12.22,12.22,0,0,1,3.85-.62,6.05,6.05,0,0,1,4.5,1.62,6.16,6.16,0,0,1,1.59,4.51v15.66Z" transform="translate(-55.79 -329.38)" fill="#232f3e"></path><path class="asr-logo-text" d="M163.86,381.25l-.5-1.86a10,10,0,0,1-3,1.84,8.52,8.52,0,0,1-3.25.69,6.84,6.84,0,0,1-4.91-1.74,6.09,6.09,0,0,1-1.85-4.64,6.17,6.17,0,0,1,1-3.5,6.66,6.66,0,0,1,2.86-2.39,10.26,10.26,0,0,1,4.39-.87,20.18,20.18,0,0,1,4.39.54v-2.07a3.41,3.41,0,0,0-.79-2.61,4.43,4.43,0,0,0-2.9-.7,25.53,25.53,0,0,0-7.5,1.28v-4a15.46,15.46,0,0,1,3.86-1.26,23.19,23.19,0,0,1,4.72-.48c2.84,0,4.92.58,6.23,1.72s2,2.95,2,5.41v14.66Zm-5-3.39a5.47,5.47,0,0,0,2.14-.46,8.19,8.19,0,0,0,2.05-1.24v-3.61a21.55,21.55,0,0,0-3.27-.29q-3.62,0-3.61,2.91a2.46,2.46,0,0,0,2.69,2.69Z" transform="translate(-55.79 -329.38)" fill="#232f3e"></path><path class="asr-logo-text" d="M172.76,381.25V377l10.9-12.39H173.18v-4.48h17.15v4.31l-11,12.39h11.23v4.47Z" transform="translate(-55.79 -329.38)" fill="#232f3e"></path><path class="asr-logo-text" d="M203.75,381.88a10,10,0,0,1-7.7-3c-1.85-2-2.78-4.73-2.78-8.26s.93-6.25,2.78-8.23a11.51,11.51,0,0,1,15.41,0q2.78,3,2.78,8.23c0,3.53-.93,6.29-2.78,8.26A10,10,0,0,1,203.75,381.88Zm0-4.64q4.35,0,4.35-6.59c0-4.36-1.45-6.55-4.35-6.55s-4.35,2.19-4.35,6.55S200.85,377.24,203.75,377.24Z" transform="translate(-55.79 -329.38)" fill="#232f3e"></path><path class="asr-logo-text" d="M232.55,381.25V367.38a3.51,3.51,0,0,0-.75-2.49,3,3,0,0,0-2.28-.79,8.37,8.37,0,0,0-4.51,1.41v15.74h-6V360.08h5l.58,2.28a12.77,12.77,0,0,1,8-2.9,5.57,5.57,0,0,1,6.13,6.13v15.66Z" transform="translate(-55.79 -329.38)" fill="#232f3e"></path><path class="asr-logo-text" d="M261.18,368.7a12.26,12.26,0,0,1-5.31-3.33,7.67,7.67,0,0,1-1.61-5,7.57,7.57,0,0,1,2.88-6.21,11.92,11.92,0,0,1,7.72-2.32,22.19,22.19,0,0,1,8,1.49v4.72a25.66,25.66,0,0,0-7.46-1.24q-4.89,0-4.89,3.15a2.46,2.46,0,0,0,.85,1.91,10.62,10.62,0,0,0,3.17,1.57l3.07,1.12a13.27,13.27,0,0,1,5.49,3.29,7.24,7.24,0,0,1,1.63,4.91,8.16,8.16,0,0,1-3.06,6.73q-3.08,2.47-8.41,2.47a25.05,25.05,0,0,1-4.64-.44,17.43,17.43,0,0,1-4-1.18v-4.72a33.13,33.13,0,0,0,4.43,1,28.78,28.78,0,0,0,4.27.37,6.75,6.75,0,0,0,3.77-.89,2.92,2.92,0,0,0,1.33-2.55,2.62,2.62,0,0,0-.81-2,10.88,10.88,0,0,0-3.25-1.66Z" transform="translate(-55.79 -329.38)" fill="#232f3e"></path><path class="asr-logo-text" d="M305.63,381.25V366.92c0-1.88-.84-2.82-2.53-2.82a10.46,10.46,0,0,0-4.51,1.08v16.07h-6V366.92c0-1.88-.84-2.82-2.53-2.82a10.19,10.19,0,0,0-4.56,1.12v16h-6V360.08h5l.54,2a18.1,18.1,0,0,1,3.95-2.05,11.19,11.19,0,0,1,3.63-.6c2.48,0,4.24.89,5.26,2.65a17.44,17.44,0,0,1,4-2,12.17,12.17,0,0,1,3.85-.62,6,6,0,0,1,4.49,1.62,6.12,6.12,0,0,1,1.6,4.51v15.66Z" transform="translate(-55.79 -329.38)" fill="#232f3e"></path><path class="asr-logo-text" d="M320.59,356.81a3.6,3.6,0,0,1-2.53-.87,3.41,3.41,0,0,1,0-4.72,4.1,4.1,0,0,1,5.05,0,3.38,3.38,0,0,1,0,4.72A3.57,3.57,0,0,1,320.59,356.81Zm-3,24.44V360.08h6.05v21.17Z" transform="translate(-55.79 -329.38)" fill="#232f3e"></path><path class="asr-logo-text" d="M338.9,380.84a9.82,9.82,0,0,1-3.73.7q-5.6,0-5.59-6.25V350.6h6v24.19a2.62,2.62,0,0,0,.4,1.64,1.59,1.59,0,0,0,1.3.48,14.31,14.31,0,0,0,1.58-.13Z" transform="translate(-55.79 -329.38)" fill="#232f3e"></path><path class="asr-logo-text" d="M347.14,372.14a5.31,5.31,0,0,0,1.66,4,7.36,7.36,0,0,0,4.68,1.22,24.44,24.44,0,0,0,6.47-1v4a13.24,13.24,0,0,1-3.46,1.16,20.34,20.34,0,0,1-4.17.42c-3.51,0-6.18-1-8-2.86s-2.76-4.7-2.76-8.37.91-6.28,2.73-8.25a9.86,9.86,0,0,1,7.59-2.94,8.45,8.45,0,0,1,6.31,2.26,8.81,8.81,0,0,1,2.22,6.44,20.24,20.24,0,0,1-.12,2.07c-.09.78-.18,1.41-.29,1.91Zm4.52-8.49a4.24,4.24,0,0,0-3.21,1.22,5.47,5.47,0,0,0-1.35,3.54h8.12v-.7Q355.22,363.65,351.66,363.65Z" transform="translate(-55.79 -329.38)" fill="#232f3e"></path><path class="asr-logo-text" d="M376.31,381.25V352.54h11.06a10.16,10.16,0,0,1,7.09,2.37,8.21,8.21,0,0,1,2.61,6.42,7.72,7.72,0,0,1-1.37,4.47,9.07,9.07,0,0,1-3.85,3.11L399,381.25h-6.42l-6.21-11.14h-4.06v11.14Zm6-15.45h4.3q4.35,0,4.35-4.39t-4.26-4.31h-4.39Z" transform="translate(-55.79 -329.38)" fill="#232f3e"></path><path class="asr-logo-text" d="M406.39,372.14a5.3,5.3,0,0,0,1.65,4,7.4,7.4,0,0,0,4.69,1.22,24.37,24.37,0,0,0,6.46-1v4a13.24,13.24,0,0,1-3.46,1.16,20.31,20.31,0,0,1-4.16.42c-3.51,0-6.18-1-8-2.86s-2.76-4.7-2.76-8.37.92-6.28,2.74-8.25a9.84,9.84,0,0,1,7.58-2.94,8.49,8.49,0,0,1,6.32,2.26,8.81,8.81,0,0,1,2.22,6.44,20.48,20.48,0,0,1-.13,2.07,17.17,17.17,0,0,1-.29,1.91Zm4.51-8.49a4.24,4.24,0,0,0-3.21,1.22,5.52,5.52,0,0,0-1.34,3.54h8.12v-.7Q414.47,363.65,410.9,363.65Z" transform="translate(-55.79 -329.38)" fill="#232f3e"></path><path class="asr-logo-text" d="M438.58,381.25l-.5-1.86a8.76,8.76,0,0,1-6.09,2.32,8.2,8.2,0,0,1-4.6-1.3,8.54,8.54,0,0,1-3.08-3.79,14.27,14.27,0,0,1-1.1-5.85,12.87,12.87,0,0,1,2.44-8.22,7.85,7.85,0,0,1,6.47-3.09,8.93,8.93,0,0,1,5.67,1.87V350.6h6v30.65Zm-4.6-4.1a6.91,6.91,0,0,0,3.81-1.16V365.06a8,8,0,0,0-4.1-1,3.65,3.65,0,0,0-3.27,1.64,9.09,9.09,0,0,0-1.08,4.95,8.61,8.61,0,0,0,1.14,4.93A4,4,0,0,0,434,377.15Z" transform="translate(-55.79 -329.38)" fill="#232f3e"></path><path class="asr-logo-text" d="M452.83,356.81a3.62,3.62,0,0,1-2.53-.87,3.41,3.41,0,0,1,0-4.72,4.11,4.11,0,0,1,5.06,0,3.41,3.41,0,0,1,0,4.72A3.62,3.62,0,0,1,452.83,356.81Zm-3,24.44V360.08h6v21.17Z" transform="translate(-55.79 -329.38)" fill="#232f3e"></path><path class="asr-logo-text" d="M461.82,381.25V360.08h5l.75,3.15a11.9,11.9,0,0,1,3.13-2.59,6.66,6.66,0,0,1,3.12-.76,12.13,12.13,0,0,1,1.66.12v5.59a12.69,12.69,0,0,0-2.57-.24,13,13,0,0,0-5,.95v14.95Z" transform="translate(-55.79 -329.38)" fill="#232f3e"></path><path class="asr-logo-text" d="M483.12,372.14a5.3,5.3,0,0,0,1.65,4,7.38,7.38,0,0,0,4.68,1.22,24.44,24.44,0,0,0,6.47-1v4a13.24,13.24,0,0,1-3.46,1.16,20.34,20.34,0,0,1-4.17.42c-3.5,0-6.18-1-8-2.86s-2.76-4.7-2.76-8.37.91-6.28,2.74-8.25a9.84,9.84,0,0,1,7.58-2.94,8.49,8.49,0,0,1,6.32,2.26,8.84,8.84,0,0,1,2.21,6.44,20.24,20.24,0,0,1-.12,2.07,17.17,17.17,0,0,1-.29,1.91Zm4.51-8.49a4.24,4.24,0,0,0-3.21,1.22,5.47,5.47,0,0,0-1.35,3.54h8.12v-.7C491.19,365,490,363.65,487.63,363.65Z" transform="translate(-55.79 -329.38)" fill="#232f3e"></path><path class="asr-logo-text" d="M516.3,380.34a9.14,9.14,0,0,1-2.69,1,15.26,15.26,0,0,1-3.28.35q-5.06,0-7.72-2.82t-2.67-8.12c0-3.5.93-6.24,2.81-8.2a10.34,10.34,0,0,1,7.83-2.94,12.1,12.1,0,0,1,5.6,1.32v4a16.3,16.3,0,0,0-4.48-.7,5.6,5.6,0,0,0-4.27,1.47q-1.37,1.47-1.36,4.66V371a6.73,6.73,0,0,0,1.34,4.62,5.4,5.4,0,0,0,4.17,1.47,18.32,18.32,0,0,0,4.72-.74Z" transform="translate(-55.79 -329.38)" fill="#232f3e"></path><path class="asr-logo-text" d="M534,380.72a13.71,13.71,0,0,1-5,.87c-2.35,0-4.08-.56-5.2-1.66s-1.68-2.82-1.68-5.14V364.56H519v-3.73l3.36-.66.91-5.8h5v5.71h5.72v4.48h-5.72v9.94a2.29,2.29,0,0,0,.66,1.87,3.59,3.59,0,0,0,2.24.54,20.8,20.8,0,0,0,2.94-.25Z" transform="translate(-55.79 -329.38)" fill="#232f3e"></path><path d="M354.44,404.88H95.18a36.11,36.11,0,0,1,0-72.22H523a36.11,36.11,0,1,1,0,72.22H387.45" transform="translate(-55.79 -329.38)" fill="none" stroke="#f8991d" stroke-linecap="round" stroke-linejoin="round" stroke-width="6.57"></path><polygon class="asr-logo-arrow" points="339.07 87.17 319.29 75.5 339.07 63.83 332.4 75.5 339.07 87.17" fill="#232f3e" stroke="#232f3e" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.28"></polygon></svg>
<br>
	Important Notification!
</div>

<div style="line-height: 1.2em; padding: 10px 20px 0 20px;">
	<p style="font-weight: bold; margin-bottom: 1.5em;">
	Dear valued Amazon Smile Redirect users,
	</p>

	<p style="margin-bottom: 1.5em;">
	We regret to inform you that the AmazonSmile program will be ending <span style="color: ${colorRed}; font-weight: bold;">February 20, 2023</span>. We want to extend our sincerest gratitude for your support and participation throughout the years by using our extension.
	</p>

	<p style="margin-bottom: 1.5em;">
	This news is a disappointment to all of us, especially the smaller charities that this will hurt the most, but we hope that you will continue to support charitable causes in other ways.
	</p>

	<p style="margin-bottom: 1.5em;">
	You can find more information about Amazon's decision at the <a href="https://www.aboutamazon.com/news/company-news/amazon-closing-amazonsmile-to-focus-its-philanthropic-giving-to-programs-with-greater-impact">official note</a>.
	</p>

	<p style="margin-bottom: 1.5em;">
	As a reminder, please make sure to remove the Amazon Smile Redirect extension from your browser by this date to avoid any redirection issues.
	</p>

	<p style="margin-bottom: 2.5em;">
	Thank you for your continued support. We hope our extension has helped you support your favorite charities. We appreciate your contributions and hope you will continue to support charitable causes in other ways. If you have any ideas or suggestions for another extension that you would like to see to help charities, please <a href="https://github.com/webdevnerdstuff/amazon-smile-redirect/discussions" style="font-weight: bold;">please let us know</a>.
	</p>

	<p>
	Sincerely,
	<br />
	Amazon Smile Redirect and WebDevNerdStuff
	</p>

</div>
<div style="padding: 0 20px 20px 0; text-align: right;">
	<button id="amazon-smile-closing-notification-close">Close</button>
</div>
`;

	const finalNotificationModal = `
<div class="amazon-smile-closing-notification" style="
background-color: #fff;
border: 3px solid ${colorRed};
border-radius: 10px;
display: flex;
justify-content: center;
flex-direction: column;
font-size: 1.2em;
height: auto;
left: 50%;
padding: 20px;
position: absolute;
box-shadow: 0.5em 0.5em 3em #000;
top: 5%;
transform: translateX(-50%);
width: 65%;
z-index: 99999;
">
${finalNotificationCopy}
</div>
`;

	finalNotificationDiv = document.createElement('div');
	finalNotificationDiv.id = 'amazon-smile-closing-notification';

	finalNotificationDiv.style.position = 'fixed';
	finalNotificationDiv.style.top = '0';
	finalNotificationDiv.style.left = '0';
	finalNotificationDiv.style.width = '100vw';
	finalNotificationDiv.style.height = '100vh';
	finalNotificationDiv.style.backgroundColor = 'hsla(0, 0%, 0%, 0.75)';
	finalNotificationDiv.style.zIndex = '99999';

	finalNotificationDiv.innerHTML = finalNotificationModal;

	setTimeout(() => {
		document.body.appendChild(finalNotificationDiv);
		document.getElementById('amazon-smile-closing-notification-close').addEventListener('click', closeFinalNotification);
	}, 1000);

	return false;
});
