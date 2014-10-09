'use strict';

angular.module('mean.lyrics').controller('LyricsController', ['$scope', 'Global', 'Lyrics',
    function($scope, Global, Lyrics) {
        $scope.global = Global;
        $scope.package = {
            name: 'lyrics'
        };
    }
]);
