angular.module('starter.controllers', [])

.controller('CalculateCtrl', function($scope) {
  $scope.monthlyIncome = 7530;
  $scope.currentNetWorth = 0;
  $scope.savingRate = 75;
  $scope.expectedReturn = 5;
  $scope.withdrawalRate = 4;
  
  //I use this in later functions, is this ok pratice in JavaScript?
  var netWorth = 0;
            
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
    //Calculated in yearsToRetire function
    return netWorth;
  }
  $scope.retireDate = function(){
    return new Date( 2055, 12, 27 );
  }
  $scope.yearsToRetire = function(){
    //get spending and savings as floats instead of money
    var spending       = parseFloat(this.monthlySpending());
    var savings        = parseFloat(this.monthlySavings());
    //based on netWorth and withdrawal rate
    var interestIncome = 0;
    //the number of months I save/invest
    var months         = 0;
    var rate           = this.expectedReturn / 100.0;
         
            //First month has no interest
    netWorth = parseFloat(this.currentNetWorth) + savings;
            
            //loop until my investments are more than my spending
    while(interestIncome < spending)
    {
            //add savings and growth rate
      netWorth += savings;
            //growth rate is per month, not year, so 1/12
      netWorth *= Math.pow(1.0 + rate, 1.0/12.0);
      interestIncome = netWorth * (this.withdrawalRate / 100.0) / 12.0;
      ++months;
    }
    
            //gets years
    return months / 12.0;
  }

});
