'use strict';

function toUtf8Standard (str) {
  var patterns = {
    'a': 'á|à|ả|ã|ạ|â|ă|ấ|ầ|ẩ|ẫ|ậ|ắ|ằ|ẳ|ẵ|ặ',
    'd': 'đ',
    'e': 'é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ',
    'i': 'í|ì|ỉ|ĩ|ị',
    'o': 'ó|ò|ỏ|õ|ọ|ô|ơ|ố|ồ|ổ|ỗ|ộ|ớ|ờ|ở|ỡ|ợ',
    'y': 'ý|ỳ|ỷ|ỹ|ỵ',
    'u': 'ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự'
  };     

  var stringUtf8Standrad = str;

  for(var key in patterns) {
    stringUtf8Standrad = stringUtf8Standrad.replace(new RegExp(patterns[key], 'gi'), key);
  }

  return stringUtf8Standrad.toLowerCase();
};

angular.module('mean.lyrics')
  .filter('customFilter', function(){
    return function(items, filterString) {
      if (!_.isUndefined(items) && !_.isUndefined(filterString)) {
        var _items = [];
        _.forEach(items, function(item) {
          var name = toUtf8Standard(item.name);
          if(name.match(new RegExp(filterString, 'i'))){
            _items.push(item);
          }
        });
        return _items;
      } else {
        return items;
      }
    };
  })
  .controller('indexCtrl', ['$rootScope', '$scope', 'Global', 'Lyrics', 'Authors', 'flashMessage', 
    'lyricUtilities', 'lyricConstant', '$cookieStore',
  	function($rootScope, $scope, Global, Lyrics, Authors, flashMessage, lyricUtilities, lyricConstant, $cookieStore) {
  		$scope.global = Global;
  		$scope.package = {
  			name: 'lyrics'
  		};

      $rootScope.$on(lyricConstant.EVENT.SWITCH_VIEW, function(event, view) {
        if ($scope.currentViewTemplate !== view){
          $scope.currentViewTemplate = view;
          $cookieStore.put(lyricConstant.COOKIES.VIEW_TEMPLATE, $scope.currentViewTemplate);
        }        
      });

      $scope.getRandomSpan = function() {
        return Math.floor((Math.random()*6)+1);
      };

      $scope.initData = function(){
        $scope.busy = false;
        $scope.from = 0;
        $scope.limit = 20;
        // $scope.limit = 5;
        $scope.seleted  = -1;
        $scope.letterFilter = undefined;

        if ($cookieStore.get(lyricConstant.COOKIES.VIEW_TEMPLATE)) {
          $scope.currentViewTemplate = $cookieStore.get(lyricConstant.COOKIES.VIEW_TEMPLATE);
        } else {
          $scope.currentViewTemplate = lyricConstant.TEMPLATE.COLUMN;
          $cookieStore.put(lyricConstant.COOKIES.VIEW_TEMPLATE, $scope.currentViewTemplate);
        }
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
        if (letter === 'All') {
          $scope.letterFilter = undefined;
        } else {
          $scope.letterFilter = letter.toLowerCase();
        }
      }

      $scope.initData();
      $scope.loadMore();
      // console.log(lyricUtilities);
      // console.log($scope);
      // console.log(lyricUtilities.updateScope($scope));
      // console.log($scope);
  	}
  ]);
