const icons = require('../json/icons.json');

const statusBtn = document.getElementById('toggle-status');
const whenLoggedInBtn = document.getElementById('toggle-only-logged-in-status');

// ----------------------------------------------------  Appends Icon to Button //
const appendIcon = (id, svgIcon) => {
	const doc = new DOMParser().parseFromString(svgIcon, 'application/xml');
	const el = document.getElementById(id);

	el.appendChild(
		el.ownerDocument.importNode(doc.documentElement, true),
	);
};

// ---------------------------------------------------- Set Elements Status //
const setElementsStatus = (btn, status) => {
	const selectedBtn = btn;
	let btnClass = 'disabled';
	let svgIcon = icons.times;
	let translationKeyName = 'nav__off';

	selectedBtn.textContent = '';

	if (typeof status === 'undefined' || status === 'enabled') {
		btnClass = 'enabled';
		svgIcon = icons.check;
		translationKeyName = 'nav__on';
	}

	if (selectedBtn.getAttribute('data-locale-key') !== null) {
		translationKeyName = 'nav__only_logged_in';
	}

	appendIcon(selectedBtn.id, svgIcon);

	selectedBtn.setAttribute('class', btnClass);
	selectedBtn.appendChild(document.createTextNode(chrome.i18n.getMessage(translationKeyName)));
};

// ---------------------------------------------------- Runtime SendMessage //
chrome.runtime.sendMessage({ getExtensionOptions: true }, (response) => {
	setElementsStatus(statusBtn, response.extensionStatus);
	setElementsStatus(whenLoggedInBtn, response.onlyWhenLoggedInStatus);
});

// ---------------------------------------------------- Status Toggles //
// Extension Status //
statusBtn.addEventListener('click', () => {
	chrome.runtime.sendMessage({ toggleStatus: true }, (response) => {
		setElementsStatus(statusBtn, response.extensionStatus);
	});
});

// Only When Logged In Status //
whenLoggedInBtn.addEventListener('click', () => {
	chrome.runtime.sendMessage({ onlyWhenLoggedInToggleStatus: true }, (response) => {
		setElementsStatus(whenLoggedInBtn, response.onlyWhenLoggedInStatus);
	});
});

// ---------------------------------------------------- External Links //
const externalLinks = {
	about: 'about.html',
	amazonSmile: 'https://smile.amazon.com/',
	devSite: 'https://github.com/webdevnerdstuff/amazon-smile-redirect',
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
