angular.module('starter.controllers', [])

.controller('CalculateCtrl', function($scope) {
  $scope.monthlyIncome = 1500;
  $scope.currentNetWorth = 15000;
  $scope.savingRate = 25;
  $scope.expectedReturn = 5;
  $scope.withdrawalRate = 4;
});
