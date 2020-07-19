const axios = require('axios');
const moment = require('moment');

module.exports = {
	domain: null,
	local_storage_expired_in_seconds: 60 * 60 * 3,
	api_url: 'https://sites-reviews.com/api/sites/',

	isEmpty: (obj) => {

		if (typeof obj === 'object') {
			for (var prop in obj) {
				if (obj.hasOwnProperty(prop))
					return false;
			}

			return true;
		} else {
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

		const url = module.exports.api_url + module.exports.domain;

		return await axios.get(url).then(function (response) {

			if (module.exports.isEmpty(response.data.data[0]))
				return 0;
			else
				return {
					"rating": response.data.data[0].rating,
					"rating_color": {
						"hex": response.data.data[0].rating_color.hex
					}
				};

		}).catch(function (error) {
			console.log(error.message);
			return false;
		});
	},

	updateLocalRating: async () => {

		console.log('updateLocalRating');

		let data = await module.exports.getRatingFromServer();

		if (data !== false) {
			await module.exports.setDomainRating(data);
		}
	},

	getRatingFromLocalStorage: async () => {
		console.log('getRatingFromLocalStorage');

		let promise = await browser.storage.local.get(module.exports.domain);

		if (promise[module.exports.domain] === undefined)
			return undefined;

		if (promise[module.exports.domain].data === undefined)
			return undefined;

		if (promise[module.exports.domain].timestamp === undefined)
			return undefined;

		if (module.exports.isExpired(promise[module.exports.domain].timestamp))
			return undefined;

		return promise[module.exports.domain].data;
	},

	setDomainRating: async (data) => {

		console.log('setDomainRating');

		let object = {};

		object[module.exports.domain] = {
			'data': data,
			'timestamp': moment().format('X')
		};

		await browser.storage.local.set(object);
	},

	loadRatingFromServerIfLocalEmpty: async () => {

		console.log('loadRatingFromServerIfLocalEmpty');

		let data = await module.exports.getRatingFromLocalStorage();

		if (module.exports.isEmpty(data)) {
			console.log(data + '  is empty');

			await module.exports.updateLocalRating();
		}

		return module.exports.getRatingFromLocalStorage();
	},

	isExpired: (timestamp) => {

		if (timestamp === undefined)
			return true;

		timestamp = moment(timestamp, 'X');


		return moment().isAfter(timestamp.add(module.exports.local_storage_expired_in_seconds, 'seconds'));
	}
};
