'use strict';

angular.module('mean.lyrics')
  .factory('lyricUtilities', ['$rootScope', 'lyricConstant', function($rootScope, lyricConstant) {
    return {
      getTemplateMore: function(content, len) {
        return content.substr(0, (len || lyricConstant.LEN_DEFAULT)) + '...';
      },
      updateScope: function(scope) {
        console.log('======================================');
        console.log(scope);
        console.log('limit:' + scope.limit);
        console.log('======================================');
        scope.phuong = 'ngo hoai phuong';
        // return scope
      }
    }
  }]);