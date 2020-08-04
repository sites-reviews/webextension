const Url = require('url-parse');
const site = require('./site');
const badge = require('./badge');
const ipRegex = require('ip-regex');

module.exports = {

	onTabsUpdated: (tabId, changeInfo, tabInfo) => {

		if (changeInfo.status === 'loading') {
			module.exports.onCurrentTabHasChanged(tabInfo);
		}
	},

	onBrowserActionClicked: (tab) => {
		if (module.exports.isUrlHasValidRemoteDomainName(tab.url)) {
			browser.tabs.create({url: 'https://sites-reviews.com/extension/redirect/?url=' + encodeURI(tab.url)});
		}
	},

	onTabsActivated: async (activeInfo) => {

		let tabInfo = await browser.tabs.get(activeInfo.tabId);

		module.exports.onCurrentTabHasChanged(tabInfo);
	},

	onCurrentTabHasChanged: (tabInfo) => {

		if (module.exports.isUrlHasValidRemoteDomainName(tabInfo.url)) {

			const url = new Url(tabInfo.url);

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

		badge.setText();
	},

	onSiteDataReceieved: (data) => {

		console.log(data);

		badge.setText(data);

		browser.browserAction.setTitle({
			title: browser.i18n.getMessage("clickButtonToReadOrWriteReviews", site.domain)
		});
	},

	isUrlHasValidRemoteDomainName: (url) => {
		const object = new Url(url);

		if (object.protocol !== 'https:' && object.protocol !== 'http:')
			return false;

		if (object.hostname.search) {
			const regex = /\./g;

			if (object.hostname === 'localhost')
				return false;

			// test if hostname is ip address
			if (ipRegex({exact: true}).test(object.hostname))
				return false;

			if (object.hostname.search(regex) > 0) {

				return true;
			}
		}

		return false;
	}
};
