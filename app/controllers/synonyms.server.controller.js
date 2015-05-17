'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Word = mongoose.model('Word'),
	_ = require('lodash');

/**
 * Create a Synonym
 */
/*exports.create = function(req, res) {
	var synonym = new Synonym(req.body);
	synonym.user = req.user;

	synonym.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} elsen(synonym);
		}
	});
};*/

/**
 * Show the current Synonym
 */
exports.read = function(req, res) {
	res.jsonp(req.synonyms);
};

/**
 * Update a Synonym
 */
/*exports.update = function(req, res) {
	var synonym = req.synonym ;

	synonym = _.extend(synonym , req.body);

	synonym.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(synonym);
		}
	});
};*/

/**
 * Delete an Synonym
 */
/*exports.delete = function(req, res) {
	var synonym = req.synonym ;

	synonym.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(synonym);
		}
	});
};*/

/**
 * List of Synonyms
 */
exports.list = function(req, res) {
	Word.find().limit(500).exec(function(err, synonyms) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(synonyms);
		}
	});
};

/**
 * Synonym middleware
 */
exports.getSynonyms = function(req, res, next) { 
	Word.findOne({word: req.params.word}).exec(function(err, synonyms) {
		if (err) return next(err);
		// if (! synonyms) return next(new Error('Failed to load synonyms for word' + req.params.word));
		if (! synonyms) {
			req.synonyms = {word: req.params.word};
			next();
		} else {
			req.synonyms = synonyms;
			next();
		}		
	});
};

/**
 * Synonym authorization middleware
 */
/*exports.hasAuthorization = function(req, res, next) {
	if (req.synonym.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};*/
