let extensionStatus;
let goToLogin;
let tabs = [];

// ---------------------------------------------------- Runtime //
// -------------------------- Get Set Storage //
chrome.storage.local.get(['extensionStatus', 'goToLogin', 'tabs'], result => {
	extensionStatus = result.extensionStatus || 'enabled';
	goToLogin = result.goToLogin || false;
	tabs = result.tabs || [];

	chrome.storage.local.set({ extensionStatus, goToLogin, tabs }, () => {});

	updateIcon();
});

// -------------------------- On Message //
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	// Check Page Load Count //
	if (request.checkPageLoadCount) {
		// If the extension is disabled //
		if (extensionStatus === 'disabled') {
			sendResponse({ extensionStatus, pageLoadCount: 0 });
			tabs = [];
			return false;
		}

		const pageLoadCount = checkPageLoadCount(sender.tab);
		goToLogin = pageLoadCount > 1 || false;
		chrome.storage.local.set({ goToLogin }, () => {});

		// Reset tabs //
		if (pageLoadCount > 1) {
			delete tabs[sender.tab.id];
		}

		sendResponse({ extensionStatus, goToLogin });
		return false;
	}

	// Get Extension Status //
	if (request.getExtensionStatus) {
		sendResponse({ extensionStatus });
		return false;
	}

	// Toggle Status //
	if (request.toggleStatus) {
		const status = updateStatus(extensionStatus);
		sendResponse({ extensionStatus: status });
	}

	return false;
});

// ---------------------------------------------------- Update Popup Status Icon //
function updateIcon() {
	if (extensionStatus === 'disabled') {
		chrome.browserAction.setIcon({
			path: {
				16: 'assets/images/icon-disabled16.png',
				48: 'assets/images/icon-disabled48.png',
				128: 'assets/images/icon-disabled128.png',
			},
		});

		return false;
	}

	chrome.browserAction.setIcon({
		path: {
			16: 'assets/images/icon16.png',
			48: 'assets/images/icon48.png',
			128: 'assets/images/icon128.png',
		},
	});

	return false;
}

// ---------------------------------------------------- Update Status //
function updateStatus() {
	extensionStatus = extensionStatus === 'enabled' ? 'disabled' : 'enabled';

	chrome.storage.local.set({ extensionStatus }, () => {});

	updateIcon();

	return extensionStatus;
}

// ---------------------------------------------------- Check Page Load Count //
function checkPageLoadCount(tab) {
	const tabId = tab.id;

	if (!tabs[tabId]) {
		tabs[tabId] = 1;
	}
	else {
		tabs[tabId] += 1;
	}

	chrome.storage.local.set({ tabs }, () => {});
	return tabs[tabId];
}
