'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	var synonyms = require('../../app/controllers/synonyms.server.controller');
	app.route('/').get(core.index);
	app.route('/').post(synonyms.synonymous);
};