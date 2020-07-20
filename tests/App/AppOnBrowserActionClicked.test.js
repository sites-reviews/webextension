const app = require('../../source/app');

describe('test onBrowserActionClicked', () => {

	it('url protocol is http', () => {

		const tab = {'url': 'http://example.com'};
		const array = {url: 'https://sites-reviews.com/extension/redirect/?url=' + encodeURI(tab.url)};

		browser.tabs.create = jest.fn();

		app.onBrowserActionClicked(tab);

		expect(browser.tabs.create).toBeCalledTimes(1);
		expect(browser.tabs.create).toBeCalledWith(array);
	});

	it('url protocol is ftp', () => {

		const tab = {'url': 'ftp://example.com'};

		browser.tabs.create = jest.fn();

		app.onBrowserActionClicked(tab);

		expect(browser.tabs.create).toBeCalledTimes(0);
	});

	it('url protocol is https', () => {

		const tab = {'url': 'https://example.com'};
		const array = {url: 'https://sites-reviews.com/extension/redirect/?url=' + encodeURI(tab.url)};

		browser.tabs.create = jest.fn();

		app.onBrowserActionClicked(tab);

		expect(browser.tabs.create).toBeCalledTimes(1);
		expect(browser.tabs.create).toBeCalledWith(array);
	});
});
