module.exports = {

	setText: (data) => {
		if (data !== undefined && data.rating !== undefined && data.rating > 0) {
			browser.browserAction.setBadgeText({text: '' + data.rating + ''});
		} else {
			browser.browserAction.setBadgeText({text: ''});
		}

		if (data !== undefined && data.rating_color !== undefined && data.rating_color.hex !== undefined) {
			browser.browserAction.setBadgeBackgroundColor({color: data.rating_color.hex});
		} else {
			browser.browserAction.setBadgeBackgroundColor({color: 'red'});
		}
	},
};
