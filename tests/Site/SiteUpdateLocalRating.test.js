describe('test update local rating', () => {

	let site = require('../../source/site');

	it('dont set domain rating if retrun from server is false', async () => {

		site.getRatingFromServer = jest.fn(rating => false);

		site.setDomainRating = jest.fn(rating => 1);

		site.updateLocalRating();

		expect(site.getRatingFromServer).toHaveBeenCalledTimes(1);
		expect(site.setDomainRating).toHaveBeenCalledTimes(0);
	});

	it('test call setDomainRating if getRatingFromServer is not false', async () => {

		site.getRatingFromServer = jest.fn(rating => 2);

		site.setDomainRating = jest.fn(rating => 1);

		await site.updateLocalRating();

		expect(site.getRatingFromServer)
			.toHaveBeenCalledTimes(1);

		expect(site.setDomainRating)
			.toHaveBeenCalledTimes(1);

		expect(site.setDomainRating)
			.toBeCalledWith(2);
	});
});
