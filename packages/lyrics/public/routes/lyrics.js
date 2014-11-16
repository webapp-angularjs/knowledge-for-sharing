'use strict';

angular.module('mean.lyrics').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
      .state('lyrics', {
        url: '/lyrics',
        controller: 'indexCtrl',
        templateUrl: 'lyrics/views/index.html'
      })
      .state('create lyric', {
        url: '/lyrics/create',
        controller: 'newCtrl',
        templateUrl: 'lyrics/views/create.html'
      });
  }
]);
