let extensionStatus;

// ---------------------------------------------------- Runtime //
// -------------------------- Get Set Storage //
chrome.storage.local.get(['extensionStatus'], result => {
  extensionStatus = result.extensionStatus || 'enabled';

  chrome.storage.local.set({ extensionStatus }, () => { });

  updateIcon();
});

// -------------------------- On Message //
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Checking if user is logged out //
  if (request.logOutCheck) {
    const goToLogin = request.loggedOut;

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

  chrome.storage.local.set({ extensionStatus }, () => { });

  updateIcon();

  return extensionStatus;
}
