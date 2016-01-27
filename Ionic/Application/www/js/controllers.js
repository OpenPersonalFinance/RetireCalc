angular.module('starter.controllers', [])

.controller('CalculateCtrl', function($scope) {
  $scope.income = 45000;

  $scope.outputUpdate = function (val) {
    this.income=val;
  }
});
