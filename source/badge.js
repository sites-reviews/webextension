module.exports = {

	setText: (data) => {

		if (data !== undefined && data.rating !== undefined && data.rating > 0) {
			browser.browserAction.setBadgeText({text: '' + data.rating + ''}).catch(e => {
				console.error(e.message);
			});
		} else {
			browser.browserAction.setBadgeText({text: ''}).catch(e => {
				console.error(e.message);
			});
		}

		if (data !== undefined && data.rating_color !== undefined && data.rating_color.hex !== undefined) {
			browser.browserAction.setBadgeBackgroundColor({color: data.rating_color.hex}).catch(e => {
				console.error(e.message);
			});
		} else {
			browser.browserAction.setBadgeBackgroundColor({color: [217, 0, 0, 255]}).catch(e => {
				console.error(e.message);
			});
		}
	},
};
