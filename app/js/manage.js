'use strict';

angular.module('GoalManager', ['ngRoute'])

.controller('manageCtrl', function($scope){
})

.config(function($routeProvider) {

    $routeProvider
      .when('/manage', {
        templateUrl: '/app/partials/goals-list.html',
        controller: 'manageCtrl'
      })
      .when('/validate/:validateTemplate', {
        templateUrl: function(param){
          var defaultUrl = '/app/partials/goal-accountability.html';
          var validator = '/app/validators/' + param.validateTemplate + '.html';
          
          return validator ? validator : defaultUrl; 
        },
        controller: 'manageCtrl'
      })
      .otherwise({
        redirectTo: '/manage'
      });

  })

;