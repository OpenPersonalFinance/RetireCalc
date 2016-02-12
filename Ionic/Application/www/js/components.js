
angular.module('components', [])

  .directive('opfMoneySlider', function() {

    return {
      restrict: 'E',
      replace: true,
      require: 'ngModel',
      transclude: false,
      templateUrl: 'templates/opf-money-slider.html',
      scope: {
        money: '=ngModel',
        min: '@min',
        max: '@max',
        title: '@title',
        step: '@step'
      }
    };
  })

  .directive('opfInterestSlider', function() {
    return {
      restrict: 'E',
      replace: true,
      require: 'ngModel',
      transclude: false,
      templateUrl: 'templates/opf-interest-slider.html',
      scope: {
        interest: '=ngModel',
        min: '@min',
        max: '@max',
        title: '@title',
        step: '@step'
      }
    };
  })

.directive('opfGraph', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'templates/opf-graph.html'
  };
});
