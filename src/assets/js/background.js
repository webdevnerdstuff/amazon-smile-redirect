let extensionStatus;
let onlyWhenLoggedInStatus;

// ---------------------------------------------------- Runtime //
chrome.storage.local.get(['extensionStatus', 'onlyWhenLoggedInStatus'], (result) => {
	extensionStatus = result.extensionStatus || 'enabled';
	onlyWhenLoggedInStatus = result.onlyWhenLoggedInStatus || 'disabled';

	chrome.storage.local.set({ extensionStatus, onlyWhenLoggedInStatus }, () => { });

	updateIcon();
});

// -------------------------- On Message //
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	let response = {};
	let status;

	// Checking if user is logged out //
	if (request.logOutCheck) {
		const goToLogin = request.loggedOut;
		response = { extensionStatus, goToLogin, onlyWhenLoggedInStatus };
	}

	// Get Extension Options //
	if (request.getExtensionOptions) {
		response = { extensionStatus, onlyWhenLoggedInStatus };
	}

	// Toggle 'Status' //
	if (request.toggleStatus) {
		status = updateOptions('extensionStatus', extensionStatus);
		response = { extensionStatus: status };
	}

	// Toggle 'Only When Logged In' //
	if (request.onlyWhenLoggedInToggleStatus) {
		status = updateOptions('onlyWhenLoggedInStatus', onlyWhenLoggedInStatus);
		response = { onlyWhenLoggedInStatus: status };
	}

	sendResponse(response);
	return false;
});

// ---------------------------------------------------- Update Popup Status Icon //
function updateIcon() {
	const iconStatus = extensionStatus === 'disabled' ? '-disabled' : '';

	chrome.action.setIcon({
		path: {
			16: `/assets/images/icon${iconStatus}16.png`,
			48: `/assets/images/icon${iconStatus}48.png`,
			128: `/assets/images/icon${iconStatus}128.png`,
		},
	});
}

// ---------------------------------------------------- Update Options //
const updateOptions = (key, val) => {
	const status = val === 'enabled' ? 'disabled' : 'enabled';

	if (key === 'extensionStatus') {
		extensionStatus = status;
		updateIcon();
	}
	else if (key === 'onlyWhenLoggedInStatus') {
		onlyWhenLoggedInStatus = status;
	}

	chrome.storage.local.set({ [key]: status }, () => { });

	return status;
};
