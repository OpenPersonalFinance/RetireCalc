angular.module('starter.controllers', [])

.controller('CalculateCtrl', function($scope) {
  $scope.monthlyIncome = 1500;
  $scope.currentNetWorth = 15000;
  $scope.savingRate = 25;
  $scope.expectedReturn = 5;
  $scope.withdrawalRate = 4;
  $scope.monthlySavings = function(){
    return this.monthlyIncome * ( this.savingRate / 100.0 );
  }
  $scope.monthlySpending = function(){
    return this.monthlyIncome - this.monthlySavings();
  }
  $scope.yearlySpending = function(){
    return this.monthlySpending() * 12;
  }
  $scope.nestEgg = function(){
    return 1000000;
  }
  $scope.retireDate = function(){
    return new Date( 2055, 12, 27 );
  }
  $scope.yearsToRetire = function(){
    //var diff = Math.abs( this.retireDate() - Date());
    //return diff / 1000 / 60 / 60 / 24 / 365;
    return 19.6;
  }

});
