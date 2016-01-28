angular.module('components', [])

  .directive('opfMoneySlider', function() {
    return {
      restrict: 'E',
      transclude: false,
      scope: {
        money: '@start',
        min: '@min',
        max: '@max',
        title: '@title'
      },
      templateUrl: 'templates/opf-money-slider.html',
      replace: true
    };
  })

  .directive('opfInterestSlider', function() {
    return {
      restrict: 'E',
      transclude: false,
      scope: {
        interest: '@start',
        min: '@min',
        max: '@max',
        title: '@title'
      },
      templateUrl: 'templates/opf-interest-slider.html',
      replace: true
    };
  })
