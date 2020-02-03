
var maniFest = chrome.runtime.getManifest();

console.log('maniFest', maniFest);




// ----------------------------------------------------- External Links //
$('body').on('click', '.external', function() {
  var url = '';
  var type = $(this).attr('data-type');

  if (type === "amazonSmile") {
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

