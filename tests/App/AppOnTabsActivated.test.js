const app = require('../../source/app');

describe('test onTabsActivated', () => {

	it('test onCurrentTabHasChanged called', async () => {

		const activeInfo = {'tabId': '1'};
		const tabInfo = 'tabInfo';

		browser.tabs.get = jest.fn(data => tabInfo);

		app.onCurrentTabHasChanged = jest.fn();

		await app.onTabsActivated(activeInfo);

		expect(app.onCurrentTabHasChanged).toBeCalledTimes(1);
		expect(app.onCurrentTabHasChanged).toBeCalledWith(tabInfo);
	});
});
