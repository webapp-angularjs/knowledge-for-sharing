'use strict';

angular.module('mean.lyrics').controller('indexCtrl', ['$rootScope', '$scope', 'Global', 'Lyrics', 'Authors', 'flashMessage', 'lyricUtilities', 'lyricConstant',
	function($rootScope, $scope, Global, Lyrics, Authors, flashMessage, lyricUtilities, lyricConstant) {
		$scope.global = Global;
		$scope.package = {
			name: 'lyrics'
		};

    $rootScope.$on(lyricConstant.EVENT.SWITCH_VIEW, function(event, view) {
      console.log('-------------------------------switchView---------------------------');
      console.log(view);
      if ($scope.currentViewTemplate !== view) $scope.currentViewTemplate = view;      
      console.log('--------------------------------------------------------------------');
    });

    $scope.initData = function(){
      $scope.busy = false;
      $scope.from = 0;
      $scope.limit = 20;
      // $scope.limit = 5;
      $scope.seleted  = -1;
      $scope.currentViewTemplate = lyricConstant.TEMPLATE.COLUMN;
    }

    $scope.isViewColumn = function() {
      return $scope.currentViewTemplate === lyricConstant.TEMPLATE.COLUMN;
    };

    $scope.getTemplateMore = function(content, len) {
      content = content.substr(0, (len || lyricConstant.LEN_DEFAULT)) + '...';
      content = content.replace(/\n/g, '<br>');
      return lyricUtilities.getTemplateMore(content, (len || content.length));
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

    $scope.setFilter = function(letter) {
      console.log('--------------------------------------------------------------');
      console.log('you selected letter:' + letter);
      console.log('--------------------------------------------------------------');
    }

    $scope.initData();
    $scope.loadMore();
    // console.log(lyricUtilities);
    // console.log($scope);
    // console.log(lyricUtilities.updateScope($scope));
    // console.log($scope);
	}
]);
