'use strict';

angular.module('mean.lyrics').controller('LyricsController', ['$scope', 'Global', 'Lyrics', 'Authors',
	function($scope, Global, Lyrics, Authors, flashMessage) {
		$scope.global = Global;
		$scope.package = {
			name: 'lyrics'
		};
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
        Lyrics.create(this.songAuthor, this.songName, this.songContent, $scope.reset);
      } else {
        /**
         * [flag show to view know submitted and will show error message if error happend]
         * @type {Boolean}
         */
        $scope.submitted = true;
      }
    };

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
	}

]);
