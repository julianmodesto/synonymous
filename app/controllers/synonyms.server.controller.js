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

exports.synonymous = function(req, res) {
	var synonymized = req.body.synonymize;
	var words = req.body.synonymize.toLowerCase().split(/\b/);
	words.filter(function unique(value, index, self) {
		return self.indexOf(value) === index;
	});

	// Asynch-recurse loop
	function synonym(i, callback) {
		if (i < words.length) {
			Word.findOne({word: words[i]}).exec(function(err, synonyms) {
				if (err) return err;
				if (synonyms && synonyms.numberOfSynonyms != 0) {
					// Replace word with a random synonym
					var replace = synonyms.synonyms[Math.floor(Math.random() * synonyms.synonyms.length)];
					synonymized = synonymized.replace(new RegExp('\\b'+words[i]+'\\b', 'gi'), replace);
				}
				synonym(i + 1, callback);
			});
		} else {
			callback();
		}
	}
	synonym(0, function() {
		res.send({synonymized: synonymized});
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