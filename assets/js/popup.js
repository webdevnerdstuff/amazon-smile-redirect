const toggleButton = document.getElementById('toggle-status');

// ---------------------------------------------------- Set Elements Status  //
function setElementsStatus(extensionStatus) {
	const enabledItem = '<i class="enabled fa-fw fas fa-check"></i> Enabled';
	const disabledItem = '<i class="fa-fw fas fa-times"></i> Disabled';

	const html = typeof extensionStatus === 'undefined' || extensionStatus === 'enabled' ? enabledItem : disabledItem;

	toggleButton.innerHTML = html;
}

// ---------------------------------------------------- Runtime SendMessage //
chrome.runtime.sendMessage({ getExtensionStatus: true }, response => {
	const status = response.extensionStatus || 'enabled';

	setElementsStatus(status);
});

// ---------------------------------------------------- Toggle Status //
toggleButton.addEventListener('click', () => {
	chrome.runtime.sendMessage({ toggleStatus: true }, response => {
		setElementsStatus(response.extensionStatus);
	});
});

// ---------------------------------------------------- External Links //
window.onload = function() {
	const externalLinks = document.getElementsByClassName('external');

	for (let i = 0; i < externalLinks.length; i += 1) {
		const externalLink = externalLinks[i];

		externalLink.onclick = function() {
			let url = '';
			const type = this.getAttribute('data-type');

			if (type === 'amazonSmile') {
				url = 'https://smile.amazon.com/';
			}
			else if (type === 'about') {
				url = 'about.html';
			}
			else if (type === 'devSite') {
				url = 'https://webdevnerdstuff.com/';
			}
			else if (type === 'userScript') {
				url = 'https://openuserjs.org/scripts/mscarchilli/Amazon_Smile_Redirect';
			}
			else if (type === 'donate') {
				url =
					'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=webdevnerdstuff%40gmail.com&item_name=Amazon+Smile+Redirect&currency_code=USD&source=url';
			}

			window.open(url, '_blank');
		};
	}
};
