'use strict';

angular.module('GoalManager', ['ngRoute'])

.controller('manageCtrl', function($scope){
})


.filter('wordCounter', function () {
        return function (value) {
            if (value && typeof value === 'string') {
                return value.trim().split(/\s+/).length;
            } else {
                return 0;
            }
        };
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
        redirectTo: '/validate/word-count' //default to word-count
      });

  })

;