'use strict';


angular.module('core').controller('HomeController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.synonymizing = false;


		$scope.synonymous = function() {
			$scope.synonymizing = true;
			$http.post('/', {synonymize: $scope.synonymize}).success(function(response) {
				// If successful we assign the response
				$scope.synonymized = response.synonymized;

				// And redirect to the index page
			}).error(function(data, status) {
			 	console.error(status, data);
			}).finally(function () {
				$scope.synonymizing = false;
			});
		};
	}
]);