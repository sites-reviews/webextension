const { getDomainRating, setDomainRating } = require('../../source/domain');

beforeEach(() => {
	browser.geckoProfiler.start.mockClear();
	browser.geckoProfiler.stop.mockClear();
});

describe('getDomainRating', () => {
	it('is first parameter url', () => {
		getDomainRating('https://example.com');
		expect(browser.storage.local.get).toHaveBeenCalledWith('https://example.com');
	});
});

describe('setDomainRating', () => {
	it('is url set and rating', () => {

		setDomainRating('https://example.com', '4');

		expect(browser.storage.local.set).toHaveBeenCalledWith({
			'https://example.com':  {rating: '4'}
		});
	});
});

