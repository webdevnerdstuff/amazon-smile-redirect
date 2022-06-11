document.querySelectorAll('[data-locale]').forEach((elm) => {
	const newElement = document.createElement(`${elm.nodeName}`);
	newElement.innerHTML = chrome.i18n.getMessage(elm.dataset.locale);

	Object.entries(elm.attributes).forEach(([key, attr]) => {
		if (attr.nodeName !== 'data-locale') {
			newElement.setAttribute(attr.nodeName, attr.value);
		}
	});

	elm.replaceWith(newElement);
});
