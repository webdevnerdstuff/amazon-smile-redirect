let extensionStatus;
let onlyWhenLoggedInStatus;
let onlyWhenCheckingOutStatus;

// ---------------------------------------------------- Runtime //
chrome.storage.local.get(['extensionStatus', 'onlyWhenLoggedInStatus', 'onlyWhenCheckingOutStatus'], (result) => {
	extensionStatus = result.extensionStatus || 'enabled';
	onlyWhenLoggedInStatus = result.onlyWhenLoggedInStatus || 'disabled';
	onlyWhenCheckingOutStatus = result.onlyWhenCheckingOutStatus || 'disabled';

	chrome.storage.local.set({ extensionStatus, onlyWhenLoggedInStatus, onlyWhenCheckingOutStatus }, () => { });

	updateIcon();
});

// -------------------------- On Message //
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	let response = {};
	let status;

	// Checking if user is logged out //
	if (request.logOutCheck) {
		const goToLogin = request.loggedOut;
		response = { extensionStatus, goToLogin, onlyWhenLoggedInStatus, onlyWhenCheckingOutStatus };
	}

	// Get Extension Options //
	if (request.getExtensionOptions) {
		response = { extensionStatus, onlyWhenLoggedInStatus, onlyWhenCheckingOutStatus };
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

	// Toggle 'Only When Checking Out' //
	if (request.onlyWhenCheckingOutToggleStatus) {
		status = updateOptions('onlyWhenCheckingOutStatus', onlyWhenCheckingOutStatus);
		response = { onlyWhenCheckingOutStatus: status };
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
	else if (key === 'onlyWhenCheckingOutStatus') {
		onlyWhenCheckingOutStatus = status;
	}

	chrome.storage.local.set({ [key]: status }, () => { });

	return status;
};
