
describe('domain variable', () => {

	it('default', () => {
		expect(site.domain).toEqual(null);
	});

	it('store', () => {
		site.domain = 'https://example.com';

		expect(site.domain).toEqual('https://example.com');
	});
});

describe('test site functions', () => {

	let site = require('../../source/site');

	it('test set and get rating to local storage is equals value', async ()  => {

		site.domain = 'example.com';
		site.setDomainRating('4');

		let value = await site.getRatingFromLocalStorage();

		expect(value).toEqual('4');
	});
});


describe('setDomainRating', () => {
	it('is url set and rating', () => {

		site.setDomainRating();

		expect(browser.storage.local.set).toHaveBeenCalledWith({
			'https://example.com':  {rating: '4'}
		});
	});
});

/*
describe('test getRatingFromServer', () => {

	import { fetchData } from './';

	jest.mock('axios');

	it('ok', () => {

		setDomainRating('https://example.com', '4');

		expect(browser.storage.local.set).toHaveBeenCalledWith({
			'https://example.com':  {rating: '4'}
		});
	});
});
*/

