'use strict';

module.exports = function(app) {
	var synonyms = require('../../app/controllers/synonyms.server.controller');

	// Synonyms Routes
	app.route('/synonyms/:word')
		.get(synonyms.read);

	// Finish by binding the Synonym middleware
	app.param('word', synonyms.getSynonyms);
};
