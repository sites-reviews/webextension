const app = require('../../source/app');
const site = require('../../source/site');
const badge = require('../../source/badge');

describe('test onSiteDataReceieved', () => {

	it('set data', () => {

		const data = {
			'rating': '4.5',
			'rating_color': {
				'hex': '#CCFFEE'
			}
		};

		browser.browserAction.setTitle = jest.fn();
		badge.setText = jest.fn();
		site.domain = 'example.com';

		app.onSiteDataReceieved(data);

		expect(badge.setText).toBeCalledTimes(1);
		expect(badge.setText).toBeCalledWith(data);

		expect(browser.browserAction.setTitle).toBeCalledTimes(1);
		expect(browser.browserAction.setTitle).toBeCalledWith({
			title: browser.i18n.getMessage("clickButtonToReadOrWriteReviews", site.domain)
		});
	});
});
