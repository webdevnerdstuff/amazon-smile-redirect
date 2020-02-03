// ----------------------------------------------------- Extension Toggle //
const enabledItem = '<i class="enabled fa-fw fas fa-check"></i> Enabled';
const disabledItem = '<i class="fa-fw fas fa-times"></i> Disabled';
const bg = chrome.extension.getBackgroundPage();
let newStatus;

function setStatusText() {
  const html = newStatus === 'enabled' ? enabledItem : disabledItem;

  $('#toggle-status').html(html);
}


function getStatus() {
  chrome.storage.local.get(['extensionStatus'], result => {
    newStatus = result.extensionStatus || 'enabled';
    setStatusText();
  });
}

function toggleStatus() {
  if (typeof newStatus === 'undefined') {
    getStatus();
  }
  else {
    newStatus = newStatus === 'enabled' ? 'disabled' : 'enabled';
    setStatusText();
  }
}

toggleStatus();

$('body').on('click', '#toggle-status', () => {
  toggleStatus();
  bg.toggleStatus();
});


// ----------------------------------------------------- External Links //
$('body').on('click', '.external', function() {
  let url = '';
  const type = $(this).attr('data-type');

  if (type === 'amazonSmile') {
    url = 'https://smile.amazon.com/';
  }
  if (type === 'about') {
    url = 'about.html';
  }
  else if (type === 'devSite') {
    url = 'https://webdevnerdstuff.com/';
  }
  else if (type === 'userScript') {
    url = 'https://openuserjs.org/scripts/mscarchilli/Amazon_Smile_Redirect';
  }
  else if (type === 'donate') {
    url = 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=donate%40mikevision%2ecom&lc=US&item_name=MikeVision%2ecom&item_number=Amazon%20Smile%20Redirect&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted';
  }

  window.open(url, '_blank');
});
