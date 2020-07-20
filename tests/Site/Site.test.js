let site = require('../../source/site');

describe('domain variable', () => {

	it('default', () => {
		expect(site.domain).toEqual(null);
	});

	it('store', () => {
		site.domain = 'https://example.com';

		expect(site.domain).toEqual('https://example.com');
	});
});

describe('api url variable', () => {

	it('default', () => {
		expect(site.api_url).toEqual('https://sites-reviews.com/api/sites/');
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

