'use strict';

// Synonyms controller
angular.module('synonyms').controller('SynonymsController', ['$scope', '$stateParams', '$location', 'Synonyms',
	function($scope, $stateParams, $location, Synonyms) {

		// Find a list of Synonyms
		$scope.find = function() {
			$scope.words = Synonyms.query();
		};

		// Find existing Synonym
		$scope.findOne = function() {
			$scope.word = Synonyms.get({word: $stateParams.word});
		};
	}
]);