module.exports = {

	setText: (data) => {
		if (data.rating !== undefined && data.rating > 0) {
			browser.browserAction.setBadgeText({text: '' + data.rating + ''});
		} else {
			browser.browserAction.setBadgeText({text: ''});
		}

		if (data.rating_color !== undefined)
		{
			if (data.rating_color.hex !== undefined)
				browser.browserAction.setBadgeBackgroundColor({color: data.rating_color.hex});
		}
	},
};
