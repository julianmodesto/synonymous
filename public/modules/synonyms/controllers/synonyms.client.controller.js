'use strict';

// Synonyms controller
angular.module('synonyms').controller('SynonymsController', ['$scope', '$stateParams', '$location', 'Synonyms',
	function($scope, $stateParams, $location, Synonyms) {

		// Find existing Synonym
		$scope.findOne = function() {
			$scope.word = Synonyms.get({word: $stateParams.word});
		};
	}
]);