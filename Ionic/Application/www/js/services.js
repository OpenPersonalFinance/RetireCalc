angular.module('starter.services', [])


//This factory service allows us to share data between controllers
//which means we can share data between pages.  For now we only need one 
//Controller.  We could probably clean it up but maybe it isn't a big deal right now.
.factory('SharedData', function(){
  sharedData = {};
  sharedData.m_withdrawalRate  = 4;
  sharedData.MONTHS_PER_YEAR   = 12;
  sharedData.m_monthlyIncome   = 5000;
  sharedData.m_currNetWorth    = 10000;
  sharedData.m_savingRate      = 15;
  sharedData.m_returnRate      = 5;
  sharedData.m_nestEgg         = 0;
  sharedData.m_yearsToRetire   = 0;
  sharedData.m_graphLabels     = []; //names for x axis on graph
  sharedData.m_graphData       = []; //the values for each set
  sharedData.m_graphColours    = [{
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
  sharedData.getGraphSteps = function(yearsToRetire){
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
  sharedData.calculateGraph =function(yearsToRetire){
    //clear graph data
    sharedData.graphLabels      = [];
    sharedData.graphData        = [];

    //used to populate $scope.data for the graph
    var graphSpendings = [];
    var graphIncomes   = [];
    //Other function variables to help readabilty
    var yearlySpending  = sharedData.yearlySpending;
    var yearlySavings   = sharedData.monthlySavings  * sharedData.MONTHS_PER_YEAR;
    var yearlyEarnRate  = sharedData.expectedReturn / 100.0;
    var yearlyWithdrawl = sharedData.withdrawalRate /100.0;
    var netWorth        = sharedData.currentNetWorth; 
    var yearlyInterest  = netWorth * yearlyWithdrawl;
    var steps           = sharedData.getGraphSteps(yearsToRetire);
    
   
    //now that we have years, lets calculate graph data
    for(var i = 0; i < yearsToRetire + (2 * steps); ++i)
    {
      netWorth *= 1 + yearlyEarnRate;
      netWorth += yearlySavings;
      yearlyInterest = netWorth * yearlyWithdrawl;
        
      if(i % steps === 0) {
        sharedData.graphLabels.push("Year " + (i + 1).toString());
        graphSpendings.push(yearlySpending);
        graphIncomes.push(yearlyInterest);
      } 
    }
    sharedData.graphData.push(graphSpendings);
    sharedData.graphData.push(graphIncomes);
  }
  //////////////////////////////////////////////////////////////////////////////
  //Function to populate the text field data 
  //returns number of years to retire which gets passed to calculateGraph()
  //assumes either savings or networth data is greater than zero.  Those values 
  //are tested in calculateRetirement() 
  //////////////////////////////////////////////////////////////////////////////
  sharedData.calculateTextFields = function(){
    var totalMonths      = 0;  //the number of months I save/invest
    var spending         = sharedData.monthlySpending;  
    var savings          = sharedData.monthlySavings;
    var netWorth         = sharedData.currentNetWorth;
    var monthlyEarnRate  = (sharedData.expectedReturn / 100.0)/ sharedData.MONTHS_PER_YEAR;
    var monthlyWithdrawl = (sharedData.withdrawalRate / 100.0)/ sharedData.MONTHS_PER_YEAR;
    var monthlyInterest  = netWorth * monthlyWithdrawl;
      
    //loop until my investments are more than my spending
    while(spending > monthlyInterest) {
      netWorth       *= 1.0 + monthlyEarnRate;      //first add last months interest
      netWorth       += savings;                    //then add this months contributions
      monthlyInterest = netWorth * monthlyWithdrawl;//calculate withdrawl % of networth
      ++totalMonths;                                //updates months so I know can know years
    }
      
    //now I have my total nest egg
    sharedData.nestEgg       = netWorth;
    sharedData.yearsToRetire = (totalMonths / sharedData.MONTHS_PER_YEAR).toFixed(1);
    
    return (totalMonths / sharedData.MONTHS_PER_YEAR);
  }
  //////////////////////////////////////////////////////////////////////////////
  //Function to calculate text fields and graph data based on slider input
  //////////////////////////////////////////////////////////////////////////////
  sharedData.calculateRetirement = function() {
    //if we aren't saving and don't have any money we can never retire
    if(sharedData.monthlySavings === 0 && sharedData.currentNetWorth === 0){
      
      sharedData.nestEgg       = 0;
      sharedData.yearsToRetire = 0;
      sharedData.graphLabels = ["Can't Retire!!!"];
      sharedData.graphData   = [[sharedData.yearlySpending], [0]];
      return;
    }
 
    var totalYears = sharedData.calculateTextFields();
    //Calculate graph based on years to retire
    sharedData.calculateGraph(totalYears);
  };
  
  Object.defineProperties(sharedData, {
    "monthlyIncome" : {
      get: function () { return this.m_monthlyIncome; },
      set: function(i) { this.m_monthlyIncome = i; this.calculateRetirement();}
    },
    "currentNetWorth" : {
      get: function () { return this.m_currNetWorth; },
      set: function(i) { this.m_currNetWorth = i; this.calculateRetirement();}
    },
    "savingRate" : {
      get: function () { return this.m_savingRate; },
      set: function(i) { this.m_savingRate = i;this.calculateRetirement();}
    },
    "expectedReturn" : {
      get: function () { return this.m_returnRate; },
      set: function(i) { this.m_returnRate = i;this.calculateRetirement();}
    },
   "withdrawalRate" : {
      get: function () { return this.m_withdrawalRate; },
      set: function(i) { this.m_withdrawalRate = i;this.calculateRetirement();}
    },
    "monthlySavings" : {
      get: function(){ return this.m_monthlyIncome * ( this.m_savingRate / 100.0 );} 
    },
    "monthlySpending" : { 
      get: function(){ return this.m_monthlyIncome - this.monthlySavings; } 
    },
    "yearlySpending" : { 
      get: function() { return this.monthlySpending * this.MONTHS_PER_YEAR; } 
    },
    "nestEgg" : { 
      get : function() { return this.m_nestEgg; },
      set : function(i) {this.m_nestEgg = i;}
    },
    "yearsToRetire" : { 
      get : function() { return this.m_yearsToRetire; },
      set : function(i) {this.m_yearsToRetire = i;}
    },
    "retireDate" : {
      get: function() {
        var today = new Date();
        return new Date(today.getTime() + this.m_yearsToRetire * 365 * 24 * 60 * 60 * 1000);
      }
    },
    "graphLabels" : {
      get: function() {return this.m_graphLabels;},
      set: function(i) {this.m_graphLabels = i;}
    },
    "graphData" : {
      get: function() {return this.m_graphData;},
      set: function(i) {this.m_graphData = i;}
    },
    "graphColours" : {
      get: function() {return this.m_graphColours}
    }
    
  });//end define proterties
  
  return sharedData;
  
});
