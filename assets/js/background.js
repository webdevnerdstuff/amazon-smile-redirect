let extensionStatus;

// ----------------------------------------------------- Get Status //


// ----------------------------------------------------- Update Popup //
function updateIcon(status) {
  console.log('updateIcon', status);
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
  console.log('setStatus');
  updateIcon(status);

  chrome.storage.local.set({ extensionStatus: status }, () => { });
}

function getStatus() {
  console.log('getStatus');
  chrome.storage.local.get(['extensionStatus'], result => {
    extensionStatus = result.extensionStatus || 'enabled';
    setStatus(extensionStatus);
  });
}

getStatus();

// ----------------------------------------------------- Update Status //
function updateStatus(status) {
  let newStatus = status === 'enabled' ? 'enabled' : 'disabled';

  if (status === 'enabled') {
    newStatus = 'disabled';
  }
  else {
    newStatus = 'enabled';
  }

  setStatus(newStatus);
}

// ----------------------------------------------------- Toggle Status //
function toggleStatus() {
  console.log('toggleStatus');
  chrome.storage.local.get(['extensionStatus'], result => {
    extensionStatus = result.extensionStatus;
    updateStatus(extensionStatus);
  });
}
