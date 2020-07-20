describe('test loadRatingFromServerIfLocalEmpty', () => {

	let site = require('../../source/site');

	it('update local rating if rating in local storage is empty', async () => {

		site.getRatingFromLocalStorage = jest.fn(data => undefined);

		site.updateLocalRating = jest.fn();

		await site.loadRatingFromServerIfLocalEmpty();

		expect(site.updateLocalRating).toHaveBeenCalledTimes(1);
	});

	it('dont update local rating if not its not empty', async () => {

		site.getRatingFromLocalStorage = jest.fn(data => 3);

		site.updateLocalRating = jest.fn();

		await site.loadRatingFromServerIfLocalEmpty();

		expect(site.updateLocalRating).toHaveBeenCalledTimes(0);
	});

	it('get rating from local storage called 2 times', async () => {

		site.getRatingFromLocalStorage = jest.fn(data => 3);

		site.updateLocalRating = jest.fn();

		await site.loadRatingFromServerIfLocalEmpty();

		expect(site.getRatingFromLocalStorage).toHaveBeenCalledTimes(2);
	});

	it('test return rating', async () => {

		site.getRatingFromLocalStorage = jest.fn(data => 3);

		expect(await site.loadRatingFromServerIfLocalEmpty()).toEqual(3);
	});
});
