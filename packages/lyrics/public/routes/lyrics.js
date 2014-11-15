'use strict';

angular.module('mean.lyrics').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
      .state('lyrics', {
        url: '/lyrics',
        templateUrl: 'lyrics/views/index.html'
      })
      .state('create lyric', {
        url: '/lyrics/create',
        templateUrl: 'lyrics/views/create.html'
      });
  }
]);
