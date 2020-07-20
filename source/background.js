let browser = require("webextension-polyfill");

const app = require('./app');

browser.browserAction.onClicked.addListener(app.onBrowserActionClicked);
browser.tabs.onUpdated.addListener(app.onTabsUpdated);
browser.tabs.onActivated.addListener(app.onTabsActivated);
