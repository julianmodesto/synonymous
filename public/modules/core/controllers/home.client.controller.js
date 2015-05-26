'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;


		$scope.synonymous = function() {
			$scope.synonymizing = true;
			$http.post('/', {synonymize: $scope.synonymize}).success(function(response) {
				// If successful we assign the response
				$scope.synonymized = response.synonymized;

				// And redirect to the index page
			}).finally(function () {
				$scope.synonymizing = false;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);