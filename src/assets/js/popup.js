import icons from './icons';

const toggleExtensionStatusButton = document.getElementById('toggle-status');
const toggleOnlyWhenLoggedInStatusStatusButton = document.getElementById('toggle-only-logged-in-status');

const renderIcon = (id, svgIcon) => {
	const doc = new DOMParser().parseFromString(svgIcon, 'application/xml');
	const el = document.getElementById(id);

	el.appendChild(
		el.ownerDocument.importNode(doc.documentElement, true),
	);
};

// ---------------------------------------------------- Set Elements Status  //
const setElementsStatus = (btn, status, translationKey = ['nav__on', 'nav__off']) => {
	const selectedBtn = btn;
	let statusText = '';
	let svgIcon = '';

	selectedBtn.textContent = '';

	if (typeof status === 'undefined' || status === 'enabled') {
		svgIcon = icons.check;
		statusText = chrome.i18n.getMessage(translationKey[0]);
		statusText = ` ${statusText}`;
		selectedBtn.setAttribute('class', 'enabled');
	}
	else {
		svgIcon = icons.times;
		selectedBtn.setAttribute('class', 'disabled');

		const translationKeyName = translationKey.length === 2 ? translationKey[1] : translationKey[0];

		statusText = chrome.i18n.getMessage(translationKeyName);
		statusText = ` ${statusText}`;
	}

	renderIcon(btn.id, svgIcon);
	selectedBtn.appendChild(document.createTextNode(statusText));
};

// ---------------------------------------------------- Runtime SendMessage //
chrome.runtime.sendMessage({ getExtensionStatus: true }, (response) => {
	setElementsStatus(toggleExtensionStatusButton, response.extensionStatus);
});

chrome.runtime.sendMessage({ getOnlyWhenLoggedInStatus: true }, (response) => {
	setElementsStatus(toggleOnlyWhenLoggedInStatusStatusButton, response.onlyWhenLoggedInStatus, ['nav__only_logged_in']);
});

// ---------------------------------------------------- Status Toggles  //
// Extension Status //
toggleExtensionStatusButton.addEventListener('click', () => {
	chrome.runtime.sendMessage({ toggleStatus: true }, (response) => {
		setElementsStatus(toggleExtensionStatusButton, response.extensionStatus);
	});
});

// Only When Logged In Status //
toggleOnlyWhenLoggedInStatusStatusButton.addEventListener('click', () => {
	chrome.runtime.sendMessage({ onlyWhenLoggedInToggleStatus: true }, (response) => {
		setElementsStatus(toggleOnlyWhenLoggedInStatusStatusButton, response.onlyWhenLoggedInStatus, ['nav__only_logged_in']);
	});
});

// ---------------------------------------------------- External Links //
const externalLinks = {
	about: 'about.html',
	amazonSmile: 'https://smile.amazon.com/',
	devSite: 'https://github.com/webdevnerdstuff',
	donate: 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=webdevnerdstuff%40gmail.com&item_name=Amazon+Smile+Redirect&currency_code=USD&source=url',
	support: 'https://github.com/webdevnerdstuff/amazon-smile-redirect/issues',
};

window.onload = () => {
	const menuLinks = document.getElementsByClassName('external');

	Object.values(menuLinks).forEach((link) => {
		const externalLink = link;
		const type = link.getAttribute('data-type');

		externalLink.onclick = () => {
			window.open(externalLinks[type], '_blank');
		};
	});
};
