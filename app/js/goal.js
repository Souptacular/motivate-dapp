'use strict';

angular.module('GoalCreator', ['ngRoute'])

.controller('goalCtrl', function($scope, goalSubmissionService, goalTypeService){
  $scope.goal = {}; //Container for goal setup data
  $scope.goal.list = goalTypeService();
  $scope.goal.data = {}; //Container for goal json data
  $scope.goal.data = goalSubmissionService().get(); //Container for goal json data

  $scope.goal.review = goalSubmissionService().get(); //Container for review page

  $scope.goal.submitGoal = function(){
    console.log('submitting goal: ', $scope.goal.data);
  }

  $scope.updateDataFactory = function(stage){
    goalSubmissionService().set(stage, $scope.goal.data);
  }

})

.factory('goalTypeService', function(){ 

  var service = {
    get: function() {
      return this.data;
    },
    set: function(data){

    },
    data:[
    {
      type: 'Writing', //categorical type of goal
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
          type: 'ethereum',
          deposit: null
        }
      ] 
     }
    ]
  }

  return function(data){

    if(data){
      service.set(data);
    }

    return service.get();
  }

})

.factory('goalSubmissionService', function(){ 

  var service = {
    get: function() {
      return this.data;
    },
    set: function(stage, data){
      if (stage === 'start') {
        this.data.name = data.name;
        this.data.description = data.description;
        this.data.contact = data.contact;
        this.data.ethereumAddress = data.ethereumAddress;
      }

      if (stage === 'setup') {
        this.data.type = data.type;
        this.data.incentive = data.incentive;
        this.data.validation = data.validation;
      }

    },
    data: {
      name: null,
      description: null,
      contact: null,
      ethereumAddress: null,
      type: null,
      incentive: null,
      validation: null
    }
  }

  return function(){
    return service;
  }
})



.config(function($routeProvider) {

    $routeProvider
      .when('/start', {
        templateUrl: '/app/partials/goal-start.html',
        controller: 'goalCtrl'
      })
      .when('/setup', {
        templateUrl: '/app/partials/goal-setup.html',
        controller: 'goalCtrl'
      })
      .when('/review', {
        templateUrl: '/app/partials/goal-review.html',
        controller: 'goalCtrl'
      })
      .otherwise({
        redirectTo: '/start'
      });

  })

;
