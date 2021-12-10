let extensionStatus;
let onlyWhenLoggedInStatus;

// ---------------------------------------------------- Runtime //
chrome.storage.local.get(['extensionStatus', 'onlyWhenLoggedInStatus'], result => {
  extensionStatus = result.extensionStatus || 'enabled';
  onlyWhenLoggedInStatus = result.onlyWhenLoggedInStatus || 'disabled';

  chrome.storage.local.set({ extensionStatus, onlyWhenLoggedInStatus }, () => { });

  updateIcon();
});

// -------------------------- On Message //
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Checking if user is logged out //
  if (request.logOutCheck) {
    const goToLogin = request.loggedOut;

    sendResponse({ extensionStatus, goToLogin, onlyWhenLoggedInStatus });
    return false;
  }

  // Get Extension 'Status' //
  if (request.getExtensionStatus) {
    sendResponse({ extensionStatus });
    return false;
  }

  // Toggle 'Status' //
  if (request.toggleStatus) {
    const statusA = updateStatus(extensionStatus);
    sendResponse({ extensionStatus: statusA });
  }

  // Get Extension 'Only When Logged In' //
  if (request.getOnlyWhenLoggedInStatus) {
    sendResponse({ onlyWhenLoggedInStatus });
    return false;
  }

  // Toggle 'Only When Logged In' //
  if (request.onlyWhenLoggedInToggleStatus) {
    const statusB = updateOnlyWhenLoggedIn(onlyWhenLoggedInStatus);
    sendResponse({ onlyWhenLoggedInStatus: statusB });
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

// ---------------------------------------------------- Update 'Status' //
function updateStatus() {
  extensionStatus = extensionStatus === 'enabled' ? 'disabled' : 'enabled';

  chrome.storage.local.set({ extensionStatus }, () => { });

  updateIcon();

  return extensionStatus;
}

// ---------------------------------------------------- Update 'Only When Logged In' //
function updateOnlyWhenLoggedIn() {
  onlyWhenLoggedInStatus = onlyWhenLoggedInStatus === 'disabled' ? 'enabled' : 'disabled';

  chrome.storage.local.set({ onlyWhenLoggedInStatus }, () => { });

  return onlyWhenLoggedInStatus;
}
