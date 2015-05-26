'use strict';

//Setting up route
angular.module('synonyms').config(['$stateProvider',
	function($stateProvider) {
		// Synonyms state routing
		$stateProvider.
		state('viewSynonym', {
			url: '/synonyms/:word',
			templateUrl: 'modules/synonyms/views/view-synonym.client.view.html'
		});
	}
]);