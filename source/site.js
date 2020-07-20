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

		return await axios.get(module.exports.getUrlForApiRequest()).then(function (response) {

			if (module.exports.isEmpty(response.data.data[0]))
				return false;
			else
				return {
					"rating": response.data.data[0].rating,
					"rating_color": {
						"hex": response.data.data[0].rating_color.hex
					}
				};

		}).catch(e => {
			console.log(e.message);
			return false;
		});
	},

	updateLocalRating: async () => {

		console.log('updateLocalRating');

		let rating = await module.exports.getRatingFromServer();

		if (rating !== false) {
			await module.exports.setDomainRating(rating);
		}
	},

	getRatingFromLocalStorage: async () => {
		console.log('getRatingFromLocalStorage');

		return browser.storage.local.get(module.exports.domain)
			.then(result => {

				const data = result[module.exports.domain];

				console.log(data);

				if (data === undefined)
					return undefined;

				if (data.data === undefined)
					return undefined;

				if (data.timestamp === undefined)
					return undefined;

				if (module.exports.isExpired(data.timestamp))
					return undefined;

				return data.data;
			}).catch(e => {
				console.error(e);
				return undefined;
			});
	},

	setDomainRating: async (data) => {

		console.log('setDomainRating');

		let object = {};

		object[module.exports.domain] = {
			'data': data,
			'timestamp': parseInt(moment().format('X'))
		};

		return await browser.storage.local.set(object);
	},

	loadRatingFromServerIfLocalEmpty: async () => {

		console.log('loadRatingFromServerIfLocalEmpty');

		let data = await module.exports.getRatingFromLocalStorage();

		if (module.exports.isEmpty(data)) {
			console.log(data + '  is empty');

			await module.exports.updateLocalRating();
		}

		return await module.exports.getRatingFromLocalStorage();
	},

	isExpired: (timestamp) => {

		if (timestamp === undefined)
			return true;

		timestamp = moment(timestamp, 'X');

		return moment().isAfter(timestamp.add(module.exports.local_storage_expired_in_seconds, 'seconds'));
	},

	getUrlForApiRequest: () => {
		return module.exports.api_url + module.exports.domain;
	}
};
