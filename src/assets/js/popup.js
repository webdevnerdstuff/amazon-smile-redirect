const toggleExtensionStatusButton = document.getElementById('toggle-status');
const toggleOnlyWhenLoggedInStatusStatusButton = document.getElementById('toggle-only-logged-in-status');

// ---------------------------------------------------- Set Elements Status  //
function setElementsStatus(btn, status, translationKey = ['nav__on', 'nav__off']) {
  console.log({ btn, status, translationKey });
  const statusIcon = document.createElement('i');
  const selectedBtn = btn;
  let statusText = '';

  selectedBtn.textContent = '';

  if (typeof status === 'undefined' || status === 'enabled') {
    statusIcon.setAttribute('class', 'enabled fa-fw fas fa-check');
    statusText = chrome.i18n.getMessage(translationKey[0]);
    statusText = ` ${statusText}`;
  }
  else {
    statusIcon.setAttribute('class', 'fa-fw fas fa-times');

    const translationKeyName = translationKey.length === 2 ? translationKey[1] : translationKey[0];

    statusText = chrome.i18n.getMessage(translationKeyName);
    statusText = ` ${statusText}`;
  }

  selectedBtn.appendChild(statusIcon);
  selectedBtn.appendChild(document.createTextNode(statusText));
}

// ---------------------------------------------------- Runtime SendMessage //
chrome.runtime.sendMessage({ getExtensionStatus: true }, response => {
  setElementsStatus(toggleExtensionStatusButton, response.extensionStatus);
});

chrome.runtime.sendMessage({ getOnlyWhenLoggedInStatus: true }, response => {
  setElementsStatus(toggleOnlyWhenLoggedInStatusStatusButton, response.onlyWhenLoggedInStatus, ['nav__only_logged_in']);
});

// ---------------------------------------------------- Status Toggles  //
// Extension Status //
toggleExtensionStatusButton.addEventListener('click', () => {
  chrome.runtime.sendMessage({ toggleStatus: true }, response => {
    setElementsStatus(toggleExtensionStatusButton, response.extensionStatus);
  });
});

// Only When Logged In Status //
toggleOnlyWhenLoggedInStatusStatusButton.addEventListener('click', () => {
  chrome.runtime.sendMessage({ onlyWhenLoggedInToggleStatus: true }, response => {
    setElementsStatus(toggleOnlyWhenLoggedInStatusStatusButton, response.onlyWhenLoggedInStatus, ['nav__only_logged_in']);
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
