const manifest = chrome.runtime.getManifest();
const date = new Date();
const year = date.getFullYear();


document.getElementById('version-number').innerText = manifest.version;
document.getElementById('copyright-year').innerText = year;
