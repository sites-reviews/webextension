const axios = require('axios');

module.exports = {

	isEmpty: (obj) => {
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop))
				return false;
		}

		return true;
	},

	loadRating: async(domain) => {

		await axios.get('https://sites-reviews.com/api/sites/yandex.ru')
			.then(function (response) {

				console.log('load');
				// handle success
				let rating = response.data.data[0].rating;

				module.exports.setDomainRating(domain, rating);

				return rating;

			})
			.catch(function (error) {
				// handle error
				console.log(error);
			})
			.finally(function () {
				// always executed
			});
	},

	getDomainRating: async (domain) => {
		let value = await browser.storage.local.get(domain);

		if (module.exports.isEmpty(value))
		{
			console.log('is_empty');
			//module.exports.loadRating(domain);
			return module.exports.getDomainRating(domain);
		}
		else
		{
			return value;
		}
	},

	setDomainRating: (domain, rating) => {
		let object = {};

		object[domain] = {rating: rating};

		browser.storage.local.set(object);

		return true;
	}
};
