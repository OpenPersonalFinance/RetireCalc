angular.module('starter.controllers', [])

.controller('CalculateCtrl', function($scope, SharedData) {
  //get data from my shared factory service
  $scope.sharedData = SharedData;
  
  //////////////////////////////////////////////////////////////////////////////
  //Property funcitons to get access to the shared data 
  //////////////////////////////////////////////////////////////////////////////
  Object.defineProperties($scope, {
    "monthlyIncome" : {
      get: function () { return this.sharedData.monthlyIncome; },
      set: function(i) { this.sharedData.monthlyIncome = parseFloat(i);}
    },
    "currentNetWorth" : {
      get: function () { return this.sharedData.currentNetWorth; },
      set: function(i) { this.sharedData.currentNetWorth = parseFloat(i);}
    },
    "savingRate" : {
      get: function () { return this.sharedData.savingRate; },
      set: function(i) { this.sharedData.savingRate = parseFloat(i);}
    },
    "expectedReturn" : {
      get: function () { return this.sharedData.expectedReturn; },
      set: function(i) { this.sharedData.expectedReturn = parseFloat(i);}
    },
    "withdrawalRate" : {
      get: function () { return this.sharedData.withdrawalRate; },
      set: function(i) { this.sharedData.withdrawalRate = parseFloat(i);}
    },
    "monthlySavings" : {
      get: function(){ return this.sharedData.monthlySavings;} 
    },
    "monthlySpending" : { 
      get: function(){ return this.sharedData.monthlySpending; } 
    },
    "yearlySpending" : { 
      get: function() { return this.sharedData.yearlySpending; } 
    },
    "nestEgg" : { 
      get: function() { return this.sharedData.nestEgg; },
      set: function(i) {this.sharedData.nestEgg = i;}
    },
    "yearsToRetire" : { 
      get: function() { return this.sharedData.yearsToRetire; },
      set: function(i) {this.sharedData.yearsToRetire = i;}
    },
    "retireDate" : {
      get: function() {return this.sharedData.retireDate;}
    },
    "graphLabels" : {
      get: function() {return this.sharedData.graphLabels;},
      set: function(i) {this.sharedData.graphLabels = i;}
    },
    "graphData" : {
      get: function() {return this.sharedData.graphData;},
      set: function(i) {this.sharedData.graphData = i;}
    },
    "graphColours" : {
      get: function() {return this.sharedData.graphColours}
    }
    
  });//end define properties

  //We need to call this function so we calculate on start up
  $scope.sharedData.calculateRetirement();
  
});
