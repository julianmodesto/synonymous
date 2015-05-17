'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var synonyms = require('../../app/controllers/synonyms.server.controller');

	// Synonyms Routes
	app.route('/synonyms')
		.get(synonyms.list);

	app.route('/synonyms/:word')
		.get(synonyms.read);

	// Finish by binding the Synonym middleware
	app.param('word', synonyms.getSynonyms);
};
