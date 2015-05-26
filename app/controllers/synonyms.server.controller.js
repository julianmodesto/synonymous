'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Word = mongoose.model('Word'),
	_ = require('lodash');

/**
 * Show the current Synonym
 */
exports.read = function(req, res) {
	res.jsonp(req.synonyms);
};

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

exports.synonymous = function(req, res) {
	var synonymize = req.body.synonymize.toLowerCase().split(/\s+/).join(' ');
	var words = req.body.synonymize.toLowerCase().split(/\s+/);
	// Asynch-recurse loop
	function synonym(i, callback) {
		if (i < words.length) {
			Word.findOne({word: words[i]}).exec(function(err, synonyms) {
				if (err) return err;
				if (synonyms) {
					// Replace word with a random synonym
					words[i] = synonyms.synonyms[Math.floor(Math.random() * synonyms.synonyms.length)];
				}
				synonym(i + 1, callback);
			});
		} else {
			callback();
		}
	}
	synonym(0, function() {
		res.send({synonymize: synonymize, synonymized: words.join(' ')});
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
			req.synonyms = {word: req.params.word, synonyms: [req.params.word]};
			next();
		} else {
			req.synonyms = synonyms;
			next();
		}		
	});
};