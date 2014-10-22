'use strict';

angular.module('mean.lyrics')
  .factory('AuthorResource', ['$resource', 
    function($resource) {
      return $resource('author/:authorId', {
        authorId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      });  
    }
  ])
  .factory('Authors', ['$resource', '$http', '$q', 'AuthorResource', function($resource, $http, $q, AuthorResource){
    return {
      create: function(author) {
        console.log('Create author:' + author);
        var resource = new AuthorResource({
          name: author,
          biography: ''
        })

        var delay = $q.defer();
        resource.$save(
          function(response) {
            delay.resolve(_.pick(response, 'name', '_id'));
          },
          function(response) {
            delay.reject(_.pick(response, 'data', 'status'));
          }
        );
        return delay.promise;
      },
      findAuthor: function(author) {
        var delay = $q.defer();
        $http.get('/authors/findAuthor', {
          params: {
            q: author
          }
        }).success(function(data){
          delay.resolve(data);
        });
        return delay.promise;
      },
      search: function(query) {
        var delay = $q.defer();
        $http.get('/authors/search', {
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
