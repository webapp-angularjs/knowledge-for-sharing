'use strict';

angular.module('mean.lyrics').directive('lyricLetters', function(){
  return {
    restrict: 'E',
    scope: {
      letters: '@'
    },
    controller: function($scope){
      $scope.alphabet = $scope.letters.split('');
      $scope.alphabet.push('All');
      $scope.activeLetter = $scope.alphabet[0];
    },
    link: function(scope, element, attrs){
      scope.setActiveLetter = function(letter){
        console.log(letter);
        scope.activeLetter  = letter;
      };
    },
    templateUrl: '/lyrics/directives/templates/letters.html'
  };
});
