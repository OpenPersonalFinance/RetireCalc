angular.module('starter.controllers', [])

.controller('CalculateCtrl', function($scope) {
  var monthlyIncome = 5000;
  var currentNetWorth = 10000;
  var savingRate = 15;
  var expectedReturn = 5;
  var withdrawalRate = 4;
  var nestEgg = 0;
  var yearsToRetire = 0;
  
  
  $scope.labels = []; //names for x axis on graph
  $scope.series = ['Spending', 'Invest Income']; //Names for each of the colors
  $scope.data   = []; //the values for each set
  //colors for each set, used British spelling because that is what the charts use
  $scope.colours = [{
    fillColor:   'rgba(255, 0, 0, .1)',
    strokeColor: 'Red',
  }, 
  {
    fillColor:   'rgba(0, 255, 0, .4)',
    strokeColor: 'Green',
  }
  ];

  ////////////////////////////////////////////////////////////////////////////
  //Calculates the graph data given a number of years to retire. 
  //This function is called in calculate retirement 
  //assumes either savings and networth data is valid
  ////////////////////////////////////////////////////////////////////////////
  function calculateGraph(yearsUntilRetirement){
    var Constants = {
      PHASE_VALUE_1:     60,
      PHASE_STEP_1:       9,
      PHASE_VALUE_2:     45,
      PHASE_STEP_2:       7,
      PHASE_VALUE_3:     30,
      PHASE_STEP_3:       5,
      PHASE_VALUE_4:     15,
      PHASE_STEP_4:       3,
      PHASE_STEP_DEFAULT: 1
    };
    
    //clear graph data
    $scope.labels      = [];
    $scope.data        = [];
    var graphSpendings = [];
    var graphIncomes   = [];
      
    var MONTHS_PER_YEAR = 12;
    var yearlySpending  = $scope.monthlySpending * MONTHS_PER_YEAR;
    var yearlySavings   = $scope.monthlySavings  * MONTHS_PER_YEAR;
    var yearlyEarnRate  = $scope.expectedReturn / 100.0;
    var yearlyWithdrawl = $scope.withdrawalRate /100.0;
    var netWorth        = $scope.currentNetWorth; 
    var yearlyInterest  = netWorth * yearlyWithdrawl;
    var steps           = 0;//the number of years between each verical bar in the graph
    
    //Change value of steps based on number of years to retire
    //This will make the graph look better
    //However there are a lot of magic numbers here
    //What is a good way to deal with this in Javascript???
    if(yearsUntilRetirement > Constants.PHASE_VALUE_1){
      steps = Constants.PHASE_STEP_1;
    }
    else if(yearsUntilRetirement > Constants.PHASE_VALUE_2){
      steps = Constants.PHASE_STEP_2;
    }
    else if(yearsUntilRetirement > Constants.PHASE_VALUE_3){
      steps = Constants.PHASE_STEP_3;
    }
    else if(yearsUntilRetirement > Constants.PHASE_VALUE_4){
      steps = Constants.PHASE_STEP_4;
    }
    else{
      steps = Constants.PHASE_STEP_DEFAULT;
    }
    
      
    
    //now that we have year, lets calculate graph data
    for(var i = 0; i < yearsUntilRetirement + (2 * steps); ++i)
    {
      netWorth *= 1 + yearlyEarnRate;
      netWorth += yearlySavings;
      yearlyInterest = netWorth * yearlyWithdrawl;
        
      if(i % steps === 0) {
        $scope.labels.push("Year " + (i + 1).toString());
        graphSpendings.push(yearlySpending);
        graphIncomes.push(yearlyInterest);
      } 
    }
    $scope.data.push(graphSpendings);
    $scope.data.push(graphIncomes);
  }
  ////////////////////////////////////////////////////////////////////////////
  //Function to populate the text field data
  //returns number of years to retire which gets passed to calculate graph function
  //assumes either savings and networth data is valid
  ////////////////////////////////////////////////////////////////////////////
  function calculateTextFields(){
    var MONTHS_PER_YEAR  = 12.0;
    var totalMonths      = 0;  //the number of months I save/invest
    var spending         = $scope.monthlySpending;  
    var savings          = $scope.monthlySavings;
    var netWorth         = $scope.currentNetWorth;
    var monthlyEarnRate  = ($scope.expectedReturn / 100.0)/ MONTHS_PER_YEAR;
    var monthlyWithdrawl = ($scope.withdrawalRate / 100.0)/ MONTHS_PER_YEAR;
    var monthlyInterest  = netWorth * monthlyWithdrawl;
    
    
    // NOTE: We could deduce the math to determine months/nestEgg directly
    // but our nest egg will always be 25 times annual spending
      
      
    //loop until my investments are more than my spending
    while(spending > monthlyInterest) {
      //first add last months interest
      netWorth *= 1.0 + monthlyEarnRate;
      //then add this months contributions
      netWorth += savings;
      //how much investment income can I now get?
      monthlyInterest = netWorth * monthlyWithdrawl;
      //updates months so I know how many years it will take
      ++totalMonths;
    }
      
    //now I have my total nest egg
    nestEgg = netWorth;
    yearsToRetire = (totalMonths / MONTHS_PER_YEAR).toFixed(1);
    
    return (totalMonths / MONTHS_PER_YEAR);
    
  }
  ////////////////////////////////////////////////////////////////////////////
  //Function to calculate text fields and graph data based on slider input
  ////////////////////////////////////////////////////////////////////////////
  function calculateRetirement() {
    if($scope.monthlySavings === 0 && $scope.currentNetWorth === 0){
      //can't retire at all, what should we do here?
      nestEgg       = 0;
      yearsToRetire = 0;
      $scope.labels = ["Can't Retire!!!"];
      $scope.data   = [[$scope.yearlySpending], [0]];
      return;
    }
 
    var totalYears = calculateTextFields();
    //Calculate graph based on years to retire
    calculateGraph(totalYears);
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
