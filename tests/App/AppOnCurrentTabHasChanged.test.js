const app = require('../../source/app');
const site = require('../../source/site');
const badge = require('../../source/badge');

describe('test onCurrentTabHasChanged', () => {

	it('if host is local', () => {

		const tabInfo = {'url': 'http://localhost'};

		browser.browserAction.setTitle = jest.fn();

		app.onCurrentTabHasChanged(tabInfo);

		expect(browser.browserAction.setTitle).toBeCalledTimes(1);
		expect(browser.browserAction.setTitle).toBeCalledWith({
			title: ''
		});
	});

	it('if host is not local', () => {

		const tabInfo = {'url': 'http://example.com/test?test=test'};

		const data = {
			'rating': '4.5',
			"rating_color": {
				"hex": "#454545"
			}
		};

		browser.browserAction.setTitle = jest.fn();
		browser.browserAction.setBadgeText = jest.fn();
		browser.browserAction.setBadgeBackgroundColor = jest.fn();
		site.loadRatingFromServerIfLocalEmpty = jest.fn(data => new Promise(resolve => {

		}));
		app.onSiteDataReceieved = jest.fn();
		badge.setText = jest.fn();

		expect(app.onCurrentTabHasChanged(tabInfo)).toBeTruthy();

		expect(site.loadRatingFromServerIfLocalEmpty).toBeCalledTimes(1);

		expect(site.domain).toEqual('example.com');

		expect(badge.setText).toBeCalledTimes(1);

		expect(badge.setText).toBeCalledWith();
	});
});
