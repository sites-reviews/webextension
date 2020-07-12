let browser = require("webextension-polyfill");

const domain = require('./domain');

const Url = require('url-parse');

let value = domain.getDomainRating('domain3dfre.com');

console.log(value);

browser.browserAction.onClicked.addListener(tab => {
	const url = new Url(tab.url);

	if (url.protocol === 'https:' || url.protocol === 'http:') {
		browser.tabs.create({url: 'https://sites-reviews.com/extension/redirect/?url=' + encodeURI(url.hostname)});
	}
});

browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tabInfo) {

	if (changeInfo.status === 'loading') {
		onChange(tabInfo);
	}
});

browser.tabs.onActivated.addListener(async function (activeInfo) {

	let tabInfo = await browser.tabs.get(activeInfo.tabId);

	onChange(tabInfo);

});


function onChange(tabInfo) {

	const url = new Url(tabInfo.url);

	if (url.hostname.search) {
		const regex = /\./g;

		if (url.hostname.search(regex) > 0) {
			/*
			domain.setDomainRating(url.hostname, 4);

			domain.getDomainRating(url.hostname).then(function (item) {
				console.log(item);
			}, function (error) {
				console.log(`Error: ${error}`);
			});
			*/
		}
	}
}

