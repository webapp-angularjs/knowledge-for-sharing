'use strict';

angular.module('mean.lyrics')
  .factory('lyricConstant', function() {
    return {
      LEN_DEFAULT: 120,
      TEMPLATE: {
        COLUMN: 'column',
        LIST: 'list'
      },
      EVENT:{
        SWITCH_VIEW: 'switchView'
      }
    }
  });