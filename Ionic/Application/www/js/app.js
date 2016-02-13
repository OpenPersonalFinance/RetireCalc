// Ionic Starter App

// function outputUpdate(vol) {
// 	document.querySelector('#volume').value = vol;
// }

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'pascalprecht.translate', 'components', 'starter.controllers', 'starter.services', 'chart.js'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $translateProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  
  //Calculate Parent Tab, uses slide box
  .state('tab.calculate', {
    url: '/calculate',
    views: {
      'tab-calculate': {
        templateUrl: 'templates/tab-calculate.html',
        controller: 'CalculateCtrl'
      }
    }
  })
  //Info Parent Tab, has child tabs within the view, but no global tab buttons
  .state('tab.info', {
    url: '/info',
    views: {
      'tab-info': {
        templateUrl: 'templates/tab-info.html'
      }
      
    }
  })
  //child tab of info, only accesable through into
  .state('tab.withdrawal', {
    url: '/withdrawal',
    views: {
      'tab-info': {
        templateUrl: 'templates/tab-withdrawal.html'

      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/calculate');

  $translateProvider.useSanitizeValueStrategy('escape');
  Translation.registerWithProvider( $translateProvider );

});
