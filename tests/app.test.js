
test('require site.js is ok', () => {

	const site = require('../source/site');

	expect(site).toMatchObject(site);
});

