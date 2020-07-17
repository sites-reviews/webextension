const axios = require('axios');

module.exports = {

	domain: null,

	isEmpty: (obj) => {

		if (typeof obj === 'object')
		{
			for (var prop in obj) {
				if (obj.hasOwnProperty(prop))
					return false;
			}

			return true;
		}
		else
		{
			if (obj === undefined)
				return true;

			if (obj === 0)
				return false;

			if (obj)
				return false;
		}
	},

	getRatingFromServer: async () => {

		console.log('getRatingFromServer');

		let response = await axios.get('https://sites-reviews.com/api/sites/' + module.exports.domain);

		if (module.exports.isEmpty(response.data.data[0]))
			return 0;
		else
			return response.data.data[0];
	},

	updateLocalRating: async () => {

		console.log('updateLocalRating');

		let data = await module.exports.getRatingFromServer();

		await module.exports.setDomainRating(data);
	},

	getRatingFromLocalStorage: async () => {
		console.log('getRatingFromLocalStorage');
		let promise = await browser.storage.local.get(module.exports.domain);

		if (promise[module.exports.domain] === undefined)
			return undefined;

		return promise[module.exports.domain];
	},

	setDomainRating: async (data) => {

		console.log('setDomainRating');

		let object = {};

		object[module.exports.domain] = data;

		await browser.storage.local.set(object);
	},

	loadRatingFromServerIfLocalEmpty: async () => {

		console.log('loadRatingFromServerIfLocalEmpty');

		let data = await module.exports.getRatingFromLocalStorage();

		if (module.exports.isEmpty(data))
		{
			console.log(data + '  is empty');

			await module.exports.updateLocalRating();
		}

		return module.exports.getRatingFromLocalStorage();
	}
};
