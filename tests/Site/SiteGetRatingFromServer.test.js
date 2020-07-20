const axios = require('axios');

jest.mock('axios');

describe('test getRatingFromServer', () => {

	let site = require('../../source/site');

	it('return data from server', async () => {

		site.domain = 'example.com';

		const sites = [{
			"id": 3,
			"domain": "example.com",
			"title": "Example.com",
			"description": "Example",
			"rating": 2.3,
			"number_of_views": 0,
			"number_of_reviews": 0,
			"url": "http://example.com",
			"rating_color": {
				"hex": "#454545",
				"rgb": "rgb(69, 69, 69)"
			}
		}];

		const resp = {data: {data: sites}};

		axios.get.mockResolvedValue(resp);

		const result = await site.getRatingFromServer();

		expect(result.rating).toBe(2.3);
		expect(result.rating_color.hex).toBe('#454545');
	});

	it('return false if api data not found', async () => {

		site.domain = 'example.com';

		const sites = [{}];
		const resp = {data: {data: sites}};

		axios.get.mockResolvedValue(resp);

		const result = await site.getRatingFromServer();

		expect(result).toBe(false);
	});

	it('return false if network error', async () => {

		axios.get.mockRejectedValueOnce('some error message');

		const result = await site.getRatingFromServer();

		expect(result).toBe(false);
	});
});
