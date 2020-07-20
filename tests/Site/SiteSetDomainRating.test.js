const moment = require('moment');

describe('test setDomainRating', () => {

	let site = require('../../source/site');

	it('to local storage', async () => {

		site.domain = 'example.com';

		site.setDomainRating(4);

		const result = await browser.storage.local.get(site.domain);
		const data = result[site.domain];

		expect(data).isPrototypeOf(Object);
		expect(data.data).toEqual(4);
		expect(parseInt(data.timestamp)).toBeLessThanOrEqual(parseInt(moment().format('X')));
	});
});
