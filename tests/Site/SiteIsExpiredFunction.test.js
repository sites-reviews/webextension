const site = require('../../source/site');
const moment = require('moment');

describe('test isExpired function', () => {
	it('is expired', () => {

		site.local_storage_expired_in_seconds = 10;

		let timestamp = moment().subtract(20, 'seconds').format('X');

		expect(site.isExpired(timestamp))
			.toBe(true);
	});

	it('is not expired', () => {

		site.local_storage_expired_in_seconds = 10;

		expect(site.isExpired(moment().subtract(5, 'seconds').format('X')))
			.toBe(false);
	});

	it('expired if not defined', () => {

		site.local_storage_expired_in_seconds = 10;

		expect(site.isExpired(undefined))
			.toBe(true);
	});

	it('test timestamp convert', () => {

		const timestamp = moment().format('X');

		const m = moment(timestamp, 'X');

		expect(moment(m.format('X'), 'X'))
			.toEqual(m);
	});
});

