const Url = require('url-parse');
const site = require('./site');
const badge = require('./badge');

module.exports = {

	onTabsUpdated: (tabId, changeInfo, tabInfo) => {

		if (changeInfo.status === 'loading') {
			module.exports.onCurrentTabHasChanged(tabInfo);
		}
	},

	onBrowserActionClicked: (tab) => {
		const url = new Url(tab.url);

		if (url.protocol === 'https:' || url.protocol === 'http:') {
			browser.tabs.create({url: 'https://sites-reviews.com/extension/redirect/?url=' + encodeURI(url)});
		}
	},

	onTabsActivated: async (activeInfo) => {

		let tabInfo = await browser.tabs.get(activeInfo.tabId);

		module.exports.onCurrentTabHasChanged(tabInfo);
	},

	onCurrentTabHasChanged: (tabInfo) => {

		const url = new Url(tabInfo.url);

		if (url.hostname.search) {
			const regex = /\./g;

			if (url.hostname.search(regex) > 0) {

				site.domain = url.hostname;

				badge.setText();

				site.loadRatingFromServerIfLocalEmpty()
					.then(module.exports.onSiteDataReceieved)
					.catch(e => {
						console.error(e);
						return false;
					});

				return true;
			}
		}

		browser.browserAction.setTitle({
			title: ''
		});
	},

	onSiteDataReceieved: (data) => {

		console.log(data);

		badge.setText(data);

		browser.browserAction.setTitle({
			title: browser.i18n.getMessage("clickButtonToReadOrWriteReviews", site.domain)
		});
	}
};
