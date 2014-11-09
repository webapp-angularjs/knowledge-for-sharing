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
  .factory('Lyrics', ['$resource', '$http', '$q', 'Authors', 'LyricResource', 'flashMessage', 
    function($resource, $http, $q, Authors, LyricResource, flashMessage){
    return {
      all: function() {
        var delay = $q.defer();
        $http.get('/lyrics/all').success(function(data){
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
