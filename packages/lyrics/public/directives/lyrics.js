'use strict';

angular.module('mean.lyrics')
  .directive('lyricLetters', function() {
    return {
      restrict: 'E',
      scope: {
        letters: '@'
      },
      controller: function($scope) {
        $scope.alphabet = ['All'].concat($scope.letters.split(''));
        $scope.activeLetter  = $scope.alphabet[0];
      },
      link: function(scope, element, attrs) {
        scope.setActiveLetter = function(letter) {
          scope.activeLetter = letter;
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
  });