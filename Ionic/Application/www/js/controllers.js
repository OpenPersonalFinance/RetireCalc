angular.module('starter.controllers', [])

.controller('CalculateCtrl', function($scope) {
  var MONTHS_PER_YEAR   = 12;
  var m_monthlyIncome   = 5000;
  var m_currNetWorth    = 10000;
  var m_savingRate      = 15;
  var m_returnRate      = 5;
  var m_withdrawalRate  = 4;
  var m_nestEgg         = 0;
  var m_yearsToRetire   = 0;
  
  
  $scope.labels       = []; //names for x axis on graph
  $scope.data         = []; //the values for each set
  //colors for each set, used British spelling because that is what the charts use
  $scope.colours      = [{
    fillColor:   'rgba(255, 0, 0, .1)',
    strokeColor: 'Red',
  }, 
  {
    fillColor:   'rgba(0, 255, 0, .4)',
    strokeColor: 'Green',
  }];
  
  //////////////////////////////////////////////////////////////////////////////
  //Function to calculate the number of verticle steps for the graph.  If there
  //are two may steps in looks messy I adjust the steps every 15 years.
  //takes the number of years to retire and returns the steps in the grapsh
  //////////////////////////////////////////////////////////////////////////////
  function getGraphSteps(yearsToRetire){
     var Constants = {
      PHASE_VALUE_1:     60,
      PHASE_VALUE_2:     45,
      PHASE_VALUE_3:     30,
      PHASE_VALUE_4:     15,
      PHASE_STEP_1:       9,
      PHASE_STEP_2:       7,
      PHASE_STEP_3:       5,
      PHASE_STEP_4:       3,
      PHASE_STEP_DEFAULT: 1
    };
    var steps = 0;
    
    //Change value of steps based on number of years to retire
    //This will make the graph look better
    if(yearsToRetire > Constants.PHASE_VALUE_1){
      steps = Constants.PHASE_STEP_1;
    }
    else if(yearsToRetire > Constants.PHASE_VALUE_2){
      steps = Constants.PHASE_STEP_2;
    }
    else if(yearsToRetire > Constants.PHASE_VALUE_3){
      steps = Constants.PHASE_STEP_3;
    }
    else if(yearsToRetire > Constants.PHASE_VALUE_4){
      steps = Constants.PHASE_STEP_4;
    }
    else{
      steps = Constants.PHASE_STEP_DEFAULT;
    }
    
    return steps;
  }
  
  //////////////////////////////////////////////////////////////////////////////
  //Calculates the graph data given a number of years to retire. 
  //This function is called in calculateRetirement() 
  //assumes either savings or networth data is greater than zero.  Those values 
  //are tested in calculateRetirement() 
  //////////////////////////////////////////////////////////////////////////////
  function calculateGraph(yearsToRetire){
    //clear graph data
    $scope.labels      = [];
    $scope.data        = [];

    //used to populate $scope.data for the graph
    var graphSpendings = [];
    var graphIncomes   = [];
    
    var yearlySpending  = $scope.yearlySpending;
    var yearlySavings   = $scope.monthlySavings  * MONTHS_PER_YEAR;
    var yearlyEarnRate  = $scope.expectedReturn / 100.0;
    var yearlyWithdrawl = $scope.withdrawalRate /100.0;
    var netWorth        = $scope.currentNetWorth; 
    var yearlyInterest  = netWorth * yearlyWithdrawl;
    var steps           = getGraphSteps(yearsToRetire);
    
   
    //now that we have years, lets calculate graph data
    for(var i = 0; i < yearsToRetire + (2 * steps); ++i)
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
  //////////////////////////////////////////////////////////////////////////////
  //Function to populate the text field data 
  //returns number of years to retire which gets passed to calculateGraph()
  //assumes either savings or networth data is greater than zero.  Those values 
  //are tested in calculateRetirement() 
  //////////////////////////////////////////////////////////////////////////////
  function calculateTextFields(){
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
      netWorth       *= 1.0 + monthlyEarnRate;      //first add last months interest
      netWorth       += savings;                    //then add this months contributions
      monthlyInterest = netWorth * monthlyWithdrawl;//calculate withdrawl % of networth
      ++totalMonths;                                //updates months so I know can know years
    }
      
    //now I have my total nest egg
    m_nestEgg       = netWorth;
    m_yearsToRetire = (totalMonths / MONTHS_PER_YEAR).toFixed(1);
    
    return (totalMonths / MONTHS_PER_YEAR);
  }
  //////////////////////////////////////////////////////////////////////////////
  //Function to calculate text fields and graph data based on slider input
  //////////////////////////////////////////////////////////////////////////////
  function calculateRetirement() {
    //if we aren't saving and don't have any money we can never retire
    if($scope.monthlySavings === 0 && $scope.currentNetWorth === 0){
      
      m_nestEgg       = 0;
      m_yearsToRetire = 0;
      $scope.labels = ["Can't Retire!!!"];
      $scope.data   = [[$scope.yearlySpending], [0]];
      return;
    }
 
    var totalYears = calculateTextFields();
    //Calculate graph based on years to retire
    calculateGraph(totalYears);
  };

  //////////////////////////////////////////////////////////////////////////////
  //Property funcitons for our internal data.  
  //////////////////////////////////////////////////////////////////////////////
  Object.defineProperties($scope, {
    "monthlyIncome" : {
      get: function () { return m_monthlyIncome; },
      set: function(i) { m_monthlyIncome = parseFloat(i); calculateRetirement(); }
    },
    "currentNetWorth" : {
      get: function () { return m_currNetWorth; },
      set: function(i) { m_currNetWorth = parseFloat(i); calculateRetirement(); }
    },
    "savingRate" : {
      get: function () { return m_savingRate; },
      set: function(i) { m_savingRate = parseFloat(i); calculateRetirement(); }
    },
    "expectedReturn" : {
      get: function () { return m_returnRate; },
      set: function(i) { m_returnRate = parseFloat(i); calculateRetirement(); }
    },
    "withdrawalRate" : {
      get: function () { return m_withdrawalRate; },
      set: function(i) { m_withdrawalRate = parseFloat(i); calculateRetirement();}
    },
    "monthlySavings" : {
      get: function(){ return m_monthlyIncome * ( m_savingRate / 100.0 );} 
    },
    "monthlySpending" : { 
      get: function(){ return m_monthlyIncome - this.monthlySavings; } 
    },
    "yearlySpending" : { 
      get: function() { return this.monthlySpending * MONTHS_PER_YEAR; } 
    },
    "nestEgg" : { 
      get: function() { return m_nestEgg; } 
    },
    "yearsToRetire" : { 
      get: function() { return m_yearsToRetire; } 
    },
    "retireDate" : {
      get: function() {
        var today = new Date();
        return new Date(today.getTime() + m_yearsToRetire * 365 * 24 * 60 * 60 * 1000);
      }
    }
  });//end define properties

  //We need to call this function so we calculate on start up
  calculateRetirement();
  
});
