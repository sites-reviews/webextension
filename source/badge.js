module.exports = {

	setText: (data) => {
		if (data.rating !== undefined)
			browser.browserAction.setBadgeText({text: '' + data.rating + ''});

		if (data.rating_color.hex !== undefined)
			browser.browserAction.setBadgeBackgroundColor({color: data.rating_color.hex});
	},
};
