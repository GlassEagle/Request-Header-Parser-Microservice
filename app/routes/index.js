'use strict';

var path = process.cwd();
var requestHeaderParserHandler = require(path + "/app/controllers/requestHeaderParserHandler.server.js");

module.exports = function (app) {

	app.route('/')
		.get(requestHeaderParserHandler);
};
