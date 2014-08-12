var pageMod = require("sdk/page-mod");
var self = require("sdk/self");

// Create a page mod
// It will run a script whenever a ".org" URL is loaded
// The script replaces the page contents with a message
pageMod.PageMod({
  include: ["http://github.com/*", "https://github.com/*"],
  contentScriptFile: [self.data.url("jquery.min.js"), self.data.url("inject.js")],
  contentStyleFile: self.data.url("inject.css")
});
