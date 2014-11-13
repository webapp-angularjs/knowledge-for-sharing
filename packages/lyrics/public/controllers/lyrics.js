'use strict';

angular.module('mean.lyrics').controller('LyricsController', ['$rootScope', '$scope', 'Global', 'Lyrics', 'Authors',
	function($rootScope, $scope, Global, Lyrics, Authors, flashMessage) {
		$scope.global = Global;
		$scope.package = {
			name: 'lyrics'
		};

    $rootScope.$on('message', function(){
      $scope.initData();
      $scope.loadMore();
    })
    /**
     * Submit form
     * Method: create
     * Parameter: true if data valid and otherwise
     */
    $scope.create  = function(formValid) {
      if (formValid) {
        /**
         * begin call Lyrics service to insert new data or updata data
         */
        Lyrics.create(this.songAuthor, this.songName, this.songContent, $scope.refreshList);
      } else {
        /**
         * [flag show to view know submitted and will show error message if error happend]
         * @type {Boolean}
         */
        $scope.submitted = true;
      }
    };

    $scope.resetForm = function() {
      $scope.reset();
    }

    $scope.refreshList = function() {
      $scope.reset();
    }

    $scope.initData = function(){
      $scope.busy = false;
      $scope.from = 0;
      $scope.limit = 10;
      $scope.limit = 5;
      $scope.seleted  = -1;      
    }

    $scope.reset = function() {
      $scope.songAuthor = '';
      $scope.songName = '';
      $scope.songContent = '';
    }

    $scope.searchAuthors = function(value) {
      return Authors.search(value)
        .then(function(data) {
          return data.authors.map(function(item){
            return item;
          });
        });
    };

    $scope.searchLyrics = function(value) {
      return Lyrics.search(value)
        .then(function(data) {
          return data.lyrics.map(function(item){
            return item;
          });
        });
    };

    $scope.getTemplateMore = function(content) {
      return content.substr(0, 120) + '...' ;
    };

    $scope.loadMore = function() {
      if($scope.busy) return;
      $scope.budy = true;

      Lyrics.all($scope.from, $scope.limit).then(function(data) {
        if ($scope.from === 0) {
          $scope.lyrics = data.lyrics;
        } else {
          $scope.lyrics = _.union($scope.lyrics, data.lyrics);
        }
        $scope.busy = false;
        if (data.lyrics.length !== 0) $scope.from += $scope.limit;
      });      
    };

    $scope.loadLyric = function(index, lyric) {
      $scope.songContent = lyric.content;
      $scope.songName = lyric.name;
      $scope.songAuthor = lyric.author;
      $scope.seleted = index;
    };

    $scope.initData();
    $scope.loadMore();
	}
]);
