let extensionStatus;
let tabs = [];

console.log('chrome', chrome);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.checkPageLoadCount) {
    console.log('======================================= checkPageLoadCount');
    // If the extension is disabled //
		if (extensionStatus === 'disabled') {
      sendResponse({ pageLoadCount: 0 });
      tabs = [];
      return false;
    }

    checkPageLoadCount(sender.tab);
    console.log('tabs[sender.tab.id].tabCount', tabs[sender.tab.id].tabCount);

    if (tabs[sender.tab.id] && tabs[sender.tab.id].tabCount >= 1) {
      tabs[sender.tab.id].tabCount = 0;
    }

    sendResponse({ pageLoadCount: tabs[sender.tab.id].tabCount });
    return false;
	}

  return false;
});

// ----------------------------------------------------- Check Page Load Count //
function checkPageLoadCount(tab) {
	const tabId = tab.id;

	if (!tabs[tabId]) {
		tabs[tabId] = tab;
		tabs[tabId].tabCount = 0;
	}

	tabs[tabId].tabCount += 1;

	return tabs[tabId].tabCount;
}

// ----------------------------------------------------- Update Popup Status Icon //
function updateIcon(status) {
	if (status === 'enabled') {
		chrome.browserAction.setIcon({
			path: 'assets/images/icon.png',
		});
	}
	else {
		chrome.browserAction.setIcon({
			path: 'assets/images/icon-disabled.png',
		});
	}
}

// ----------------------------------------------------- Set Status //
function setStatus(status) {
	updateIcon(status);
	extensionStatus = status;
	chrome.storage.local.set({ extensionStatus: status }, () => {});
}

// ----------------------------------------------------- Update Status //
function updateStatus(status) {
	let newStatus = status === 'enabled' ? 'enabled' : 'disabled';

	if (status === 'enabled') {
		newStatus = 'disabled';
	}
	else {
		newStatus = 'enabled';
	}

	console.log('newStatus', newStatus);
	setStatus(newStatus);
}

// ----------------------------------------------------- Toggle Status //
function toggleStatus() {
	console.group('toggleStatus');
	console.log('--------------------------------- toggleStatus');
	chrome.storage.local.get(['extensionStatus'], result => {
		extensionStatus = result.extensionStatus;
		console.log('toggle', extensionStatus);
		console.groupEnd();
		tabs = [];
		updateStatus(extensionStatus);
	});
}

// ----------------------------------------------------- On Install Get/Set Local Storage //
chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.local.get(['extensionStatus'], result => {
		extensionStatus = result.extensionStatus || 'enabled';
		chrome.storage.local.set({ extensionStatus }, () => {});
		setStatus(extensionStatus);
	});
});
