describe('test getUrlForApiRequest', () => {

	let site = require('../../source/site');

	it('return data from server', async () => {

		site.domain = 'example.com';

		expect(site.getUrlForApiRequest())
			.toEqual(site.api_url + site.domain);
	});
});
