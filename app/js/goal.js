'use strict';

angular.module('GoalCreator', ['ngRoute'])

.controller('goalCtrl', function($scope){
  $scope.goal = {}; //Container for goal setup data
  $scope.page = {}; //Containerfor page data 

  //should be moved to a factory
  $scope.page.goal = [
   {
    type: 'Writing',
    tasks: [
      {

      }
    ],
    validations: [
      {

      }
    ] 
   }
  ];

})

.factory('goalService', function(){ 

  //mock goal JSON - this will need to be stored and fetch
  var goal = {
    name: null,
    description: null,
    contact: null,
    ethereumAddress: null,
    goalTypes: [
       {
        type: 'Writing', //categorical type of goal
        tasks: [ //list of preset tasks
          {
            type: 'Blogging'
          }
        ],
        validations: [ //list of preset validations
          {
            type: 'word count',
            startDate: null,
            endDate: null,
            count: null,
            validatorUrl: 'validators/word-count.html'
          }
        ],
        incentives: [ //list of incentives
          {
            type: 'standard-monetary',
            deposit: null,
            unit: null //unit of deprecation per failed task
          }
        ] 
       }
    ]
  }
  return function(){
    return goal;
  }
})

.config(function($routeProvider) {

    $routeProvider
      .when('/setup', {
        templateUrl: '/app/partials/goal-setup.html',
        controller: 'goalCtrl'
      })
      .when('/accountability', {
        templateUrl: '/app/partials/goal-accountability.html',
        controller: 'goalCtrl'
      })
      .when('/review', {
        templateUrl: '/app/partials/goal-review.html',
        controller: 'goalCtrl'
      })
      .otherwise({
        redirectTo: '/setup'
      });

  })

;
