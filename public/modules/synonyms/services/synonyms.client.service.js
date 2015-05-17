'use strict';

//Synonyms service used to communicate Synonyms REST endpoints
angular.module('synonyms').factory('Synonyms', ['$resource',
	function($resource) {
		return $resource('synonyms/:word', { word: '@word' });
	}
]);