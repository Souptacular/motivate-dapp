'use strict';

angular.module('motivateDapp', ['ngRoute'])

.controller('goalCtrl', function($scope){
	$scope.testMsg = "Goal Creator";
})

.config(function($routeProvider) {

    $routeProvider.
      when('/setup', {
        templateUrl: 'partials/goal-setup.html',
        controller: 'goalCtrl'
      }).  
      when('/accountability', {
        templateUrl: 'partials/goal-accountability.html',
        controller: 'goalCtrl'
      }).      
      when('/review', {
        templateUrl: 'partials/goal-review.html',
        controller: 'goalCtrl'
      }).
      otherwise({
        redirectTo: '/setup'
      });

  });

;
