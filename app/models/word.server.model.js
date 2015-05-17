'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Word Schema
 */
var WordSchema = new Schema({
	word: {
		type: String
	},
	numberOfSynonyms: {
		type: Number
	},
	synonyms: [
		{
			type: String
		}
	]
});

mongoose.model('Word', WordSchema);