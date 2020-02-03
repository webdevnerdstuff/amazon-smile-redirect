const manifest = chrome.runtime.getManifest();

$('.version span').html(manifest.version);

const date = new Date();
const year = date.getFullYear();

$('.copyright span').html(year);
