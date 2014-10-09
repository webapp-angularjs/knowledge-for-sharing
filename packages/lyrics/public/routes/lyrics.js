'use strict';

angular.module('mean.lyrics').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('lyrics', {
            url: '/lyrics/all',
            templateUrl: 'lyrics/views/index.html'
        });
    }
]);
