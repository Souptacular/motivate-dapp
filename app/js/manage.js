'use strict';

angular.module('GoalManager', ['ngRoute'])

.controller('manageCtrl', function($scope){
	$scope.testMsg = "Manage My Goals";
})

.config(function($routeProvider) {

    $routeProvider
      .when('/manage', {
        templateUrl: 'partials/goals-list.html',
        controller: 'manageCtrl'
      })
      .when('/validate/:validateTemplate', {
        templateUrl: function(param){
          var defaultUrl = 'partials/goal-accountability.html';
          var validator = 'validator/' + param.validateTemplate + '.html';
          
          return validator ? validator : defaultUrl; 
        },
        controller: 'manageCtrl'
      })
      .otherwise({
        redirectTo: '/manage'
      });

  })

;