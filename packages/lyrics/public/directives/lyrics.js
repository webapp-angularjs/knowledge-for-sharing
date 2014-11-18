'use strict';

angular.module('mean.lyrics')
  .directive('lyricLetters', function() {
    return {
      restrict: 'E',
      scope: {
        letters: '@',
        onSubmit: '&onSubmit'
      },
      controller: function($scope) {
        $scope.alphabet = ['All'].concat($scope.letters.split(''));
        $scope.activeLetter  = $scope.alphabet[0];
      },
      link: function(scope, element, attrs) {
        scope.setActiveLetter = function(letter) {
          scope.activeLetter = letter;
          console.log('setActiveLetter');
          scope.onSubmit()(letter);
        };
      },
      templateUrl: '/lyrics/directives/templates/letters.html'
    };
  })
  .directive('lyricSearch', ['$rootScope', 'lyricConstant', function($rootScope, lyricConstant) {
    return {
      restrict: 'E',
      scope: {
        viewDefault: '=viewDefault'
      },
      controller: function($scope) {
        $scope.viewTemplateDefault = lyricConstant.TEMPLATE.COLUMN;
        $scope.viewTemplate = $scope.viewDefault;
      },
      link: function(scope, element, attrs) {
        scope.switchView = function(view) {
          switch(view) {
            case true:
              scope.viewTemplate = lyricConstant.TEMPLATE.COLUMN;
              break;
            case false:
              scope.viewTemplate = lyricConstant.TEMPLATE.LIST;
              break;
          }
          $rootScope.$broadcast(lyricConstant.EVENT.SWITCH_VIEW, scope.viewTemplate);
        }
      },
      templateUrl: '/lyrics/directives/templates/search.html'
    };
  }])
  .directive('whenScrolled', function() {
    return function(scope, elm, attr) {
      var raw = elm[0];
      elm.bind('scroll', function() {
        if(raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
          scope.$apply(attr.whenScrolled);
        }
      });
    };
  })
  .directive('mixitup', function() {
    return {
      restrict: 'A',
      scope: {
        entities: '='
      },
      link: function(scope, element, attrs) {
        scope.$watch('entities', function() {
          console.log('entities drawings.....');
          element.mixItUp();
        });
      }
    }
  });
