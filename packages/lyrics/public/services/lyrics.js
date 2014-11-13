'use strict';

angular.module('mean.lyrics')
  .factory('LyricResource', ['$resource', 
    function($resource) {
      return $resource('lyric/:lyricId', {
        lyricId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      });  
    }
  ])
  .factory('Lyrics', ['$rootScope', '$http', '$q', 'Authors', 'LyricResource', 'flashMessage', 
    function($rootScope, $http, $q, Authors, LyricResource, flashMessage){
    return {
      all: function(from, limit) {
        limit = limit || 10;
        from = from || 0;
        var delay = $q.defer();
        $http.get('/lyrics/all', {
          params: {
            limit: limit,
            from: from
          }
        }).success(function(data){
          delay.resolve(data);
        })
        return delay.promise;
      },
      create: function(author, song, content, done) {
        var resource = new LyricResource({
          song_name: song,
          song_content: content,
          author: author          
        });
        resource.$save(
          // when success
          function(response) {
            $rootScope.$broadcast('message');
            flashMessage.success({
              message: response.status,
              callback: done
            });
          },
          // when not success
          function(response) {
            flashMessage.error({
              message: response.data.errorCode,
              callback: done
            });
          }
        );
      },
      search: function(query) {
        var delay = $q.defer();
        $http.get('/lyrics/search', {
          params: {
            q: query
          }
        }).success(function(data){
          delay.resolve(data);
        });

        return delay.promise;
      }            
    };
  }]);