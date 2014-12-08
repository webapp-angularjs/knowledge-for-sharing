'use strict';

angular.module('mean.theme')
	.controller('ThemeController', ['$scope', 'Global', '$location', '$rootScope',
	  function($scope, Global, $location, $rootScope) {
	 		$rootScope.$on('$stateChangeStart',
      	function(event, toState, toParams, fromState, fromParams){
					var toPath = toState.url.replace('/','');
        	$scope.state = toPath;
        	if($scope.state === '' ) {
          	$scope.state = 'firstPage';
        	}
    		});
// Original scaffolded code.
      $scope.global = Global;
      $scope.package = {
        name: 'theme'
      };

      $rootScope.enabledGoTop = false;

      $scope.$on('enabledGoTop', function($evt, active, locals) {
        $rootScope.enabledGoTop = active;
      });

      $rootScope.gotoTop = function() {
        var startY = currentYPosition();
        var stopY = elmYPosition('k4s-body');
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        var speed = Math.round(distance / 100);
        var i;

        if (distance < 100) {
          scrollTo(0, stopY); return;
        }

        if (speed >= 20) speed = 20;

        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;

        if (stopY > startY) {
          for (i=startY; i<stopY; i+=step ) {
            setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
          } 
          return;
        }

        for (i=startY; i>stopY; i-=step ) {
          setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
          leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }

        setTimeout(scrollTo(startY, stopY), 2000*speed);

        function currentYPosition() {
          // Firefox, Chrome, Opera, Safari
          if (self.pageYOffset) return self.pageYOffset;
          // Internet Explorer 6 - standards mode
          if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
          // Internet Explorer 6, 7 and 8
          if (document.body.scrollTop) return document.body.scrollTop;
          return 0;
        }
        
        function elmYPosition(eID) {
          var elm = document.getElementById(eID);
          var y = elm.offsetTop;
          var node = elm;
          while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
          } return y;
        }        
      }      
    }
  ]);
