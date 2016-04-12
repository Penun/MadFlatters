(function(){
	var app = angular.module('flatter', ['flatter-orders']);
	app.constant('Constants', {
		FlipAnimStates: {
			PRE: 'PRE_STATE',
			LIFT: 'LIFT_STATE',
			ROTATE: 'ROTATE_STATE',
			DROP: 'DROP_STATE',
			END: 'ENS_STATE'
		}
	});
	app.controller('tabManager', ['$scope', 'Constants', function($scope, Constants){
		this.tab = 1;
		$scope.animDiv = document.getElementById("animDiv");
		$scope.curScale = 1;
		$scope.curTransY = 0;
		$scope.curTransX = 0;
		$scope.curDeg = 0;
		$scope.flipOut = true;
		$scope.AnimState = Constants.FlipAnimStates.PRE;
		$scope.flipRight = true;
		$scope.interval = null;

		if (document.documentElement.clientWidth >= 1366){
			$scope.cappedWidth = true;
		} else {
			$scope.cappedWidth = false;
		}

		this.selectTab = function(newTab){
			if (this.tab != newTab){
				this.tab = newTab;
				$scope.interval = setInterval(this.flipAnim, 60);
			}
		};
		this.isSelected = function(checkT){
			return this.tab === checkT;
		};
		this.flipAnim = function(){
			if ($scope.flipOut){
				$scope.curScale -= 0.05;
				$scope.curTransY += 1.5;
				if ($scope.flipRight){
					$scope.curDeg += 9;
					if ($scope.cappedWidth){
						$scope.curTransX -= 68.3;
					} else {
						$scope.curTransX -= 5;
					}
				} else {
					$scope.curDeg -= 9;
					if ($scope.cappedWidth){
						$scope.curTransX += 68.3;
					} else {
						$scope.curTransX += 5;
					}
				}
				if ($scope.curScale <= 0.5){
					$scope.flipOut = false;
				}
			} else {
				$scope.curScale += 0.05;
				$scope.curTransY -= 1.5;
				if ($scope.flipRight){
					$scope.curDeg += 9;
					if ($scope.cappedWidth){
						$scope.curTransX -= 68.3;
					} else {
						$scope.curTransX -= 5;
					}
				} else {
					$scope.curDeg -= 9;
					if ($scope.cappedWidth){
						$scope.curTransX += 68.3;
					} else {
						$scope.curTransX += 5;
					}
				}
				if ($scope.curScale >= 1){
					$scope.curScale = 1;
					$scope.curTransY = 0;
					if ($scope.flipRight){
						$scope.curDeg = 180;
						$scope.flipRight = false;
						if ($scope.cappedWidth){
							$scope.curTransX = -1366;
						}
					} else {
						$scope.curDeg = 0;
						$scope.flipRight = true;
						if ($scope.cappedWidth){
							$scope.curTransX = 0;
						}
					}
					$scope.flipOut = true;
					clearInterval($scope.interval);
				}
			}

			if ($scope.cappedWidth){
				$scope.animDiv.style.transform = "scale3d(" + $scope.curScale + ", " + $scope.curScale + ", 1) translate3d(" + $scope.curTransX + "px, -" + $scope.curTransY + "vw, 0) rotateY(" + $scope.curDeg + "deg)";				
			} else {
				$scope.animDiv.style.transform = "scale3d(" + $scope.curScale + ", " + $scope.curScale + ", 1) translate3d(" + $scope.curTransX + "vw, -" + $scope.curTransY + "vw, 0) rotateY(" + $scope.curDeg + "deg)";
			}
		};
	}]);
})();