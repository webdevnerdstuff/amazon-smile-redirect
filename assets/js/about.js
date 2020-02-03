var manifest = chrome.runtime.getManifest();

$('.version span').html(manifest.version);

var date = new Date();
var year = date.getFullYear();

$('.copyright span').html(year);
