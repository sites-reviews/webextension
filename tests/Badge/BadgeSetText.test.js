const badge = require('../../source/badge');

describe('test setText', () => {

	it('set empty data', async () => {

		browser.browserAction.setBadgeText = jest.fn().mockImplementation(() => Promise.resolve());
		browser.browserAction.setBadgeBackgroundColor = jest.fn().mockImplementation(() => Promise.resolve());

		badge.setText();

		expect(browser.browserAction.setBadgeText).toBeCalledTimes(1);
		expect(browser.browserAction.setBadgeText).toBeCalledWith({text: ''});

		expect(browser.browserAction.setBadgeBackgroundColor).toBeCalledTimes(1);
		expect(browser.browserAction.setBadgeBackgroundColor).toBeCalledWith({color: [217, 0, 0, 255]});
	});

	it('set not empty data',() => {

		const data = {
			'rating': '4.5',
			'rating_color': {
				'hex': '#CCFFEE'
			}
		};

		browser.browserAction.setBadgeText = jest.fn().mockImplementation(() => Promise.resolve());
		browser.browserAction.setBadgeBackgroundColor = jest.fn().mockImplementation(() => Promise.resolve());

		badge.setText(data);

		expect(browser.browserAction.setBadgeText).toBeCalledTimes(1);
		expect(browser.browserAction.setBadgeText).toBeCalledWith({text: '' + data.rating + ''});

		expect(browser.browserAction.setBadgeBackgroundColor).toBeCalledTimes(1);
		expect(browser.browserAction.setBadgeBackgroundColor).toBeCalledWith({color: data.rating_color.hex});
	});
});
