'use strict';

angular.module('GoalCreator', ['ngRoute'])

.controller('goalCtrl', function($scope){
	$scope.testMsg = "Goal Creator";
})

.config(function($routeProvider) {

    $routeProvider
      .when('/setup', {
        templateUrl: 'partials/goal-setup.html',
        controller: 'goalCtrl'
      })
      .when('/accountability', {
        templateUrl: 'partials/goal-accountability.html',
        controller: 'goalCtrl'
      })
      .when('/review', {
        templateUrl: 'partials/goal-review.html',
        controller: 'goalCtrl'
      })
      .otherwise({
        redirectTo: '/setup'
      });

  });

;

angular.module('GoalManager', ['ngRoute'])

.controller('manageCtrl', function($scope){
	$scope.testMsg = "Manage My Goals";
})

;

angular.module('GoalBoard', ['ngRoute'])

.controller('boardCtrl', function($scope){
	$scope.testMsg = "Goal Board";
})

;
