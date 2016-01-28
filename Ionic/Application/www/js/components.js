angular.module('components', [])

  .directive('moneySlider', function() {
    return {
      restrict: 'E',
      transclude: false,
      scope: {
        money: '@start',
        min: '@min',
        max: '@max',
        title: '@title'
      },
      template:
        '<div class="item range range-positive">' +
          '<label>{{title}}</label>' +
          '<input type="range" ng-model="money" min="{{min}}" max="{{max}}"/>' +
          '<output>{{money | currency}}</output>' +
        '</div>',
      replace: true
    };
  })
