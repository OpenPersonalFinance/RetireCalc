angular.module('starter.controllers', [])
  .controller('CalculateCtrl', function ($scope, $ionicLoading, SharedData) {
  
  //get data from my shared factory service
  $scope.sharedData = SharedData;
  
  //////////////////////////////////////////////////////////////////////////////
  //Property funcitons to get access to the shared data 
  //////////////////////////////////////////////////////////////////////////////
  Object.defineProperties($scope, {
    "monthlyIncome" : {
      get: function () { return this.sharedData.monthlyIncome; },
      set: function (i) { this.sharedData.monthlyIncome = parseFloat(i); }
    },
    "currentNetWorth" : {
      get: function () { return this.sharedData.currentNetWorth; },
      set: function (i) { this.sharedData.currentNetWorth = parseFloat(i); }
    },
    "savingRate" : {
      get: function () { return this.sharedData.savingRate; },
      set: function (i) { this.sharedData.savingRate = parseFloat(i); }
    },
    "expectedReturn" : {
      get: function () { return this.sharedData.expectedReturn; },
      set: function (i) { this.sharedData.expectedReturn = parseFloat(i); }
    },
    "withdrawalRate" : {
      get: function () { return this.sharedData.withdrawalRate; },
      set: function (i) { this.sharedData.withdrawalRate = parseFloat(i); }
    },
    "monthlySavings" : {
      get: function () { return this.sharedData.monthlySavings; } 
    },
    "monthlySpending" : { 
      get: function () { return this.sharedData.monthlySpending; } 
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


  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //Load and Save helper funtions
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  
  
  
  //////////////////////////////////////////////////////////////////////////////
  //getFile errorhandler
  //////////////////////////////////////////////////////////////////////////////
  function GetFileError(error){
    $ionicLoading.hide();
    console.log("Request for file failed");
  }
  //////////////////////////////////////////////////////////////////////////////
  //requestFileSystem errorhandler
  //////////////////////////////////////////////////////////////////////////////
  function GetFileSystemError(error){
    $ionicLoading.hide();
    console.log("Request for filesystem failed");
  }
  //////////////////////////////////////////////////////////////////////////////
  //error handler for reader/writer
  //////////////////////////////////////////////////////////////////////////////
  function GetReaderWriterError(error){
    $ionicLoading.hide();
    console.log("Could not Read/Write File");
  }
  //////////////////////////////////////////////////////////////////////////////
  //After a successful call to getfile in load
  //////////////////////////////////////////////////////////////////////////////
  function GotFileEntryLoad(fe){
    // Get a File object representing the file then use FileReader to read its contents.
    fe.file(function(file) {
      //create our reader
      var reader = new FileReader();
      
      //Set what happens when the file is loaded
      reader.onloadend = function(e) {
        var myArray = this.result.split(",");
        $scope.monthlyIncome    = myArray[0];
        $scope.currentNetWorth  = myArray[1];
        $scope.savingRate       = myArray[2];
        $scope.withdrawalRate   = myArray[3];
        $scope.expectedReturn   = myArray[4];
        $ionicLoading.hide();
      };
      
      reader.onerror = function(e){
        $ionicLoading.hide();
      };
      
      //read the file
      reader.readAsText(file);
    }, GetReaderWriterError);
  }
  //////////////////////////////////////////////////////////////////////////////
  //After a successful call to getDirectory in load
  //////////////////////////////////////////////////////////////////////////////
  function GotDirectoryLoad(dirEntry){
    dirEntry.getFile("retireData.txt", {create: false, exclusive: false}, 
                     GotFileEntryLoad, //on success 
                     GetFileError);    //on failure
  }
  //////////////////////////////////////////////////////////////////////////////
  //After a successful call to requestfilesystem in load
  //////////////////////////////////////////////////////////////////////////////
  function RequestFileSystemLoad(fs){
    fs.root.getDirectory("RetireCalc",{create: true}, GotDirectoryLoad);
  }

  
  //////////////////////////////////////////////////////////////////////////////
  //After a successful call to getfile in save
  //////////////////////////////////////////////////////////////////////////////
  function GotFileEntrySave(fe){
    // Create a FileWriter object for our FileEntry (log.txt).
    fe.createWriter(function(fileWriter) {
      fileWriter.onwriteend = function(e) {
        $ionicLoading.hide();
        console.log('Write completed.');
      };
      
      fileWriter.onerror = function(e) {
        $ionicLoading.hide();
        console.log('Write failed: ' + e.toString());
      };
      // Create a new Blob and write it to log.txt.
      var blob = new Blob([$scope.monthlyIncome.toString(), 
                           "," + $scope.currentNetWorth.toString(),
                           "," + $scope.savingRate.toString(),
                           "," + $scope.withdrawalRate.toString(),
                           "," + $scope.expectedReturn.toString(),
                           ","],
                          {type: 'text/plain'});
      fileWriter.write(blob);
    }, GetReaderWriterError);//end create writer
  }
  //////////////////////////////////////////////////////////////////////////////
  //After a successful call to getDirectory in Save
  //////////////////////////////////////////////////////////////////////////////
  function GotDirectorySave(dirEntry) {
    dirEntry.getFile("retireData.txt", {create: true, exclusive: false}, 
                     GotFileEntrySave, //on success
                     GetFileError);    //on failure
  }
  //////////////////////////////////////////////////////////////////////////////
  //After a Successful call to Requestfilesystem in save
  //////////////////////////////////////////////////////////////////////////////
  function RequestFileSystemSave(fs){
    fs.root.getDirectory("RetireCalc",{create: true}, GotDirectorySave);
  }
  
  //////////////////////////////////////////////////////////////////////////////
  //Saves slider data to a file
  //////////////////////////////////////////////////////////////////////////////
  $scope.save = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
    
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
                             RequestFileSystemSave ,//on success
                             GetFileSystemError);   //on failure
  }
  //////////////////////////////////////////////////////////////////////////////
  //Loads slider data from a file
  //////////////////////////////////////////////////////////////////////////////
  $scope.load = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
                             RequestFileSystemLoad, //on success
                             GetFileSystemError);   //on failure
    $ionicLoading.hide();
  }
  
  //On controller start/////////////////////////////////////////////////////////
  //We need to call this function so we calculate on start up
  $scope.sharedData.calculateRetirement();
  document.addEventListener("deviceready", onDeviceReady, false);
  function onDeviceReady() {
    $scope.load();
  }
  document.addEventListener("pause", onPause, false);
  function onPause() {
    $scope.save();
  }
  
  
  
});
