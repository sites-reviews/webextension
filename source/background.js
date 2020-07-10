const Url = require('url-parse');

browser.browserAction.onClicked.addListener(tab => {
	const url = new Url(tab.url);

	if (url.protocol === 'https:' || url.protocol === 'http:') {
		browser.tabs.create({url: 'https://sites-reviews.com/extension/redirect/?url=' + encodeURI(url.hostname)});
	}
});


/*
browser.browserAction.setBadgeText(
	{text: '123'}
);
*/

browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tabInfo) {

	if (changeInfo.status === 'loading')
	{
		onChange(tabInfo);
	}
});

browser.tabs.onActivated.addListener(async function (activeInfo) {

	let tabInfo = await browser.tabs.get(activeInfo.tabId);

	onChange(tabInfo);

});

function onChange(tabInfo) {

	const url = new Url(tabInfo.url);

	console.log(url.hostname);
}
