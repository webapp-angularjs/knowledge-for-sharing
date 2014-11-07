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
      createLyric: function(data, done) {
        console.log('-------------------------------------------------------------');
        console.log(data);
        console.log('-------------------------------------------------------------');

        var resource = new LyricResource(data);
        resource.$save(
          // when success
          function(response) {
            console.log('----------------------------success----------------------------');
            console.log(response);
            console.log('---------------------------------------------------------------');
            // flashMessage.success({
            //   message: response.errorCode,
            //   seconds: 5
            // });
          },
          // when not success
          function(response) {
            console.log('----------------------------failed-----------------------------');
            console.log(response);
            console.log('---------------------------------------------------------------');
            flashMessage.error({
              message: response.data.errorCode,
              seconds: 5
            });
          }
        );
        return;

        // var resource = new LyricResource(data);

        // resource.$save(function(response) {
        //   flashMessage.success({
        //     message: 'Saved information about lyric.',
        //     seconds: 5
        //   });
        //   console.log ('response:');
        //   console.log (resource);

        //   done();
        // });
      },
      createAuthor: function(_this, author, song, content, done) {
        Authors.create(author).then(
          function(response){
            flashMessage.success({
              message: 'Saved information about author.',
              seconds: 5
            });
            _this.createLyric({
              song_name: song,
              song_content: content,
              author: response._id                  
            }, done);
          }, 
          function(response){
            flashMessage.error({
              message: response.data.error,
              seconds: 5
            });                  
          }
        )
      },
      create: function(author, song, content, done) {
        /**
         * before save data need check with author specify already in DB?
         * if not yet then save information basic of this author
         * else will get author id for request save data
         */
        // var _this = this;
        // if (_.isString(author)) {
        //   Authors.findAuthor(author).then(function(data){
        //     if (data.length === 0) {
        //       _this.createAuthor(_this, author, song, content, done);
        //     } else {
        //       _this.createLyric({
        //         song_name: song,
        //         song_content: content,
        //         author: data._id                  
        //       }, done);
        //     }
        //   });
        // } else {
        //   _this.createLyric({
        //     song_name: song,
        //     song_content: content,
        //     author: author.id                  
        //   }, done);
        // }
        this.createLyric({
          song_name: song,
          song_content: content,
          author: author
        });
      }
    };
  }]);
