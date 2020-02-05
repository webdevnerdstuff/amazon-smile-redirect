const manifest = chrome.runtime.getManifest();
const date = new Date();
const year = date.getFullYear();

document.getElementById('version-number').innerHTML = manifest.version;
document.getElementById('copyright-year').innerHTML = year;
