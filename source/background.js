let browser = require("webextension-polyfill");
const Url = require('url-parse');
const site = require('./site');
const badge = require('./badge');

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

			site.domain = url.hostname;

			site.loadRatingFromServerIfLocalEmpty().then(function (data) {
				console.log(data);
				badge.setText(data);
			});
		}
	}
}

