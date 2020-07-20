const app = require('../../source/app');

describe('test onTabsUpdated', () => {

	it('status is loading', () => {

		const tabId = 1;
		const changeInfo = {'status': 'loading'};
		const tabInfo = 'tabInfo';

		app.onCurrentTabHasChanged = jest.fn();

		app.onTabsUpdated(tabId, changeInfo, tabInfo);

		expect(app.onCurrentTabHasChanged).toBeCalledTimes(1);
		expect(app.onCurrentTabHasChanged).toBeCalledWith(tabInfo);
	});

	it('status is not loading', () => {

		const tabId = 1;
		const changeInfo = {'status': 'waiting'};
		const tabInfo = 'tabInfo';

		app.onCurrentTabHasChanged = jest.fn();

		app.onTabsUpdated(tabId, changeInfo, tabInfo);

		expect(app.onCurrentTabHasChanged).toBeCalledTimes(0);
	});
});
