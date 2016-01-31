angular.module('starter.controllers', [])

.controller('CalculateCtrl', function($scope) {
  var monthlyIncome = 5000;
  var currentNetWorth = 10000;
  var savingRate = 15;
  var expectedReturn = 5;
  var withdrawalRate = 4;
  var nestEgg = 0;
  var yearsToRetire = 0;

  function calculateRetirement() {

    //get spending and savings as floats instead of money
    var spending       = $scope.monthlySpending;
    var savings        = $scope.monthlySavings;


    //the number of months I save/invest
    var months         = 0;
    var netWorth       = $scope.currentNetWorth;
    var earnRate       = $scope.expectedReturn / 100.0;
    var spendRate      = $scope.withdrawalRate / 100.0;

    //based on netWorth and withdrawal rate

    //loop until my investments are more than my spending
    // NOTE: We should deduce the math to determine months/nestEgg directly
    if( savings > 0 || netWorth > 0)
    {
      while(spending > netWorth * (spendRate / 12.0))
      {
        //add savings and growth rate
        netWorth += savings;

        //growth rate is per month, not year, so 1/12
        netWorth *= Math.pow(1.0 + earnRate, 1.0/12.0);
        ++months;
      }
    }

    nestEgg = netWorth;
    yearsToRetire = (months / 12.0).toFixed(1);
  };

  Object.defineProperties($scope, {
    "monthlyIncome" : {
      get: function () { return monthlyIncome; },
      set: function(i) { monthlyIncome = parseFloat(i); calculateRetirement(); }
    },
    "currentNetWorth" : {
      get: function () { return currentNetWorth; },
      set: function(i) { currentNetWorth = parseFloat(i); calculateRetirement(); }
    },
    "savingRate" : {
      get: function () { return savingRate; },
      set: function(i) { savingRate = parseFloat(i); calculateRetirement(); }
    },
    "expectedReturn" : {
      get: function () { return expectedReturn; },
      set: function(i) { expectedReturn = parseFloat(i); calculateRetirement(); }
    },
    "withdrawalRate" : {
      get: function () { return withdrawalRate; },
      set: function(i) { withdrawalRate = parseFloat(i); calculateRetirement(); }
    },
    "monthlySavings" : {get: function(){ return monthlyIncome * ( savingRate / 100.0 );} },
    "monthlySpending" : { get: function(){ return monthlyIncome - this.monthlySavings; } },
    "yearlySpending" : { get: function() { return this.monthlySpending * 12; } },
    "nestEgg" : { get: function() { return nestEgg; } },
    "yearsToRetire" : { get: function() { return yearsToRetire; } },
    "retireDate" : {
      get: function() {
        var today = new Date();
        return new Date(
          today.getTime() + yearsToRetire * 365 * 24 * 60 * 60 * 1000);
      }
    }
  });

  calculateRetirement();
});
