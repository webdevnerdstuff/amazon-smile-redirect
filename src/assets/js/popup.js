const config = require('../json/config.json');

const statusBtn = document.getElementById('toggle-status');
const whenLoggedInBtn = document.getElementById('toggle-only-logged-in-status');
const whenCheckingOutBtn = document.getElementById('toggle-only-checking-out-status');

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
	let svgIcon = config.icons.times;
	let translationKeyName = 'nav__off';

	selectedBtn.textContent = '';

	if (typeof status === 'undefined' || status === 'enabled') {
		btnClass = 'enabled';
		svgIcon = config.icons.check;
		translationKeyName = 'nav__on';
	}

	if (selectedBtn.getAttribute('data-locale-key') !== null) {
		translationKeyName = 'nav__only_logged_in';

		if (btn.id === 'toggle-only-checking-out-status') {
			translationKeyName = 'nav__only_checking_out';
		}
	}

	appendIcon(selectedBtn.id, svgIcon);

	selectedBtn.setAttribute('class', btnClass);
	selectedBtn.appendChild(document.createTextNode(chrome.i18n.getMessage(translationKeyName)));
};

// ---------------------------------------------------- Runtime SendMessage //
chrome.storage.local.get(['extensionStatus', 'onlyWhenLoggedInStatus', 'onlyWhenCheckingOutStatus'], (result) => {
	setElementsStatus(statusBtn, result.extensionStatus);
	setElementsStatus(whenLoggedInBtn, result.onlyWhenLoggedInStatus);
	setElementsStatus(whenCheckingOutBtn, result.onlyWhenCheckingOutStatus);
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

// Only When Checking Out Status //
whenCheckingOutBtn.addEventListener('click', () => {
	chrome.runtime.sendMessage({ onlyWhenCheckingOutToggleStatus: true }, (response) => {
		setElementsStatus(whenCheckingOutBtn, response.onlyWhenCheckingOutStatus);
	});
});

// ---------------------------------------------------- External Links //
window.onload = () => {
	const menuLinks = document.getElementsByClassName('external');

	Object.values(menuLinks).forEach((link) => {
		const externalLink = link;
		const type = link.getAttribute('data-type');

		externalLink.onclick = () => {
			window.open(config.externalLinks[type], '_blank');
		};
	});
};
