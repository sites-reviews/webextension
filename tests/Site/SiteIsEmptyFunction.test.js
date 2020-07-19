const { isEmpty } = require('../../source/site');

describe('isEmpty', () => {
	it('zero not empty', () => {
		expect(isEmpty(0)).toBe(false);
	});

	it('undefined is empty', () => {
		expect(isEmpty(undefined)).toBe(true);
	});

	it('number is not empty', () => {
		expect(isEmpty(5)).toBe(false);
	});

	it('number is not empty', () => {
		expect(isEmpty('5')).toBe(false);
	});

	it('empty object is empty', () => {
		expect(isEmpty({})).toBe(true);
	});
});

