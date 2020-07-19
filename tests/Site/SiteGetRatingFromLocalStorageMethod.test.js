import moment from 'moment';

describe('test getRatingFromLocalStorage', () => {

	let site = require('../../source/site');

	it('return undefined', async () => {

		site.domain = 'example.com';

		expect(await site.getRatingFromLocalStorage()).toBeUndefined();
	});

	it('return undefined if timestamp is empty', async () => {

		site.domain = 'example.com';

		let object = {};

		object[site.domain] = {
			'data': '5'
		};

		await browser.storage.local.set(object);

		expect(await site.getRatingFromLocalStorage()).toBeUndefined();
	});

	it('return null if timestamp is expired', async () => {

		site.domain = 'example.com';
		site.local_storage_expired_in_seconds = 60;

		let object = {};

		object[site.domain] = {
			'data': '5',
			'timestamp': moment().subtract(70, 'seconds').format('X')
		};

		await browser.storage.local.set(object);

		expect(await site.getRatingFromLocalStorage()).toBeUndefined();
	});

	it('return undefined if data is undefined', async () => {

		site.domain = 'example.com';
		site.local_storage_expired_in_seconds = 60;

		let object = {};

		object[site.domain] = {};

		await browser.storage.local.set(object);

		expect(await site.getRatingFromLocalStorage()).toBeUndefined();
	});

	it('return right data', async () => {

		site.domain = 'example.com';
		site.local_storage_expired_in_seconds = 60;

		let object = {};

		object[site.domain] = {
			'data': '5',
			'timestamp': moment().format('X')
		};

		await browser.storage.local.set(object);

		expect(await site.getRatingFromLocalStorage()).toEqual('5');
	});
});
