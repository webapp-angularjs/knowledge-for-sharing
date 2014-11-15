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
          scope.onSubmit()(letter);
        };
      },
      templateUrl: '/lyrics/directives/templates/letters.html'
    };
  })
  .directive('lyricSearch', function() {
    return {
      restrict: 'E',
      templateUrl: '/lyrics/directives/templates/search.html'
    };
  })
  .directive('whenScrolled', function() {
    return function(scope, elm, attr) {
      var raw = elm[0];
      elm.bind('scroll', function() {
        if(raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
          scope.$apply(attr.whenScrolled);
        }
      });
    };
  });
