(function(){
	var app = angular.module('flatter', ['flatter-orders']);
	app.constant('Constants', {
		FlipAnimStates: {
			PRE: 'PRE_STATE',
			LIFT: 'LIFT_STATE',
			ROTATE: 'ROTATE_STATE',
			DROP: 'DROP_STATE',
			END: 'END_STATE'
		}
	});
	app.controller('tabManager', ['$scope', 'Constants', function($scope, Constants){
		$scope.tab = 0;
		$scope.pendTab = 1;
		$scope.animDiv = document.getElementById("animDiv");
		$scope.targetIn = document.getElementById("bImg");
		$scope.targetOut = document.getElementById("bImgRev");
		$scope.curScale = 1;
		$scope.curTransY = 0;
		$scope.curTransX = 0;
		$scope.curDeg = 0;
		$scope.flipOut = true;
		$scope.AnimState = Constants.FlipAnimStates.PRE;
		$scope.flipAnimCyc = 0;
		$scope.fadeInAnimCyc = 0;
		$scope.fadeOutAnimCyc = 0;
		$scope.flipRight = true;
		$scope.intervalFlip = null;
		$scope.intervalFadeIn = null;
		$scope.intervalFadeOut = null;

		if (document.documentElement.clientWidth >= 1366){
			$scope.cappedWidth = true;
		} else {
			$scope.cappedWidth = false;
		}

		this.selectTab = function(newTab){
			if ($scope.tab != newTab && $scope.AnimState == Constants.FlipAnimStates.PRE){
				$scope.pendTab = newTab;
				$scope.intervalFlip = setInterval(this.flipAnim, 60);
				$scope.triggerFadeOut();
			}
		};
		this.isSelected = function(checkT){
			return $scope.tab === checkT;
		};

		this.flipAnim = function(){
			switch ($scope.AnimState){
				case Constants.FlipAnimStates.PRE:
					$scope.AnimState = Constants.FlipAnimStates.LIFT;
				break;
				case Constants.FlipAnimStates.LIFT:
					if ($scope.flipAnimCyc < 5){
						$scope.curScale -= 0.05;
						$scope.curTransY += 1.5;
						if ($scope.flipRight){
							if ($scope.cappedWidth){
								$scope.curTransX -= 136.6;
							} else {
								$scope.curTransX -= 10;
							}
						} 
						$scope.flipAnimCyc++;
					} else {
						$scope.AnimState = Constants.FlipAnimStates.ROTATE;
					}
				break;
				case Constants.FlipAnimStates.ROTATE:
					if ($scope.flipAnimCyc < 15){
						if ($scope.flipRight){
							$scope.curDeg += 18;
						} else {
							$scope.curDeg -= 18;
						}
						if ($scope.flipAnimCyc < 10){
							$scope.curScale -= 0.05;
							$scope.curTransY += 1.5;
							if ($scope.flipRight){
								if ($scope.cappedWidth){
									$scope.curTransX -= 136.6;
								} else {
									$scope.curTransX -= 10;
								}
							} 
						}
						$scope.flipAnimCyc++;
					} else {
						$scope.AnimState = Constants.FlipAnimStates.DROP;
					}
				break;
				case Constants.FlipAnimStates.DROP:
					if ($scope.flipAnimCyc < 25){
						$scope.curScale += 0.05;
						$scope.curTransY -= 1.5;
						if (!$scope.flipRight){
							if ($scope.cappedWidth){
								$scope.curTransX += 136.6;
							} else {
								$scope.curTransX += 10;
							}
						}
						$scope.flipAnimCyc++;
					} else {
						$scope.AnimState = Constants.FlipAnimStates.END;
					}
				break;
				case Constants.FlipAnimStates.END:
					$scope.curScale = 1;
					$scope.curTransY = 0;
					if ($scope.flipRight){
						$scope.curDeg = 180;
						$scope.flipRight = false;
						if ($scope.cappedWidth){
							$scope.curTransX = -1366;
						} else {
							$scope.curTransX = -100; 
						}
					} else {
						$scope.curDeg = 0;
						$scope.flipRight = true;
						$scope.curTransX = 0;
					}
					$scope.flipOut = true;
					$scope.AnimState = Constants.FlipAnimStates.PRE;
					$scope.flipAnimCyc = 0;
					var swapZInd = $scope.targetIn.style.zIndex;
					$scope.targetOut.style.zIndex = swapZInd;
					swapZInd *= -1;
					$scope.targetIn.style.zIndex = swapZInd;
					$scope.triggerFadeIn();
					clearInterval($scope.intervalFlip);
				break;
				default:
				break;
			}

			if ($scope.cappedWidth){
				$scope.animDiv.style.transform = "scale3d(" + $scope.curScale + ", " + $scope.curScale + ", 1) translate3d(" + $scope.curTransX + "px, -" + $scope.curTransY + "vw, 0) rotateY(" + $scope.curDeg + "deg)";				
			} else {
				$scope.animDiv.style.transform = "scale3d(" + $scope.curScale + ", " + $scope.curScale + ", 1) translate3d(" + $scope.curTransX + "vw, -" + $scope.curTransY + "vw, 0) rotateY(" + $scope.curDeg + "deg)";
			}
		};

		$scope.fadeOutAnim = function(){
			if ($scope.fadeOutAnimCyc < 10){
				var opacity = ($scope.fadeOutAnimCyc + 1) * .1;
				$scope.targetOut.style.opacity = opacity;
				$scope.fadeOutAnimCyc++;
			} else {
				clearInterval($scope.intervalFadeOut);
				$scope.tab = $scope.pendTab;
				$scope.fadeOutAnimCyc = 0;
			}
		};
		$scope.triggerFadeOut = function(){
			$scope.targetOut.style.visibility = "visible";
			$scope.intervalFadeOut = setInterval($scope.fadeOutAnim, 50);
		};

		$scope.fadeInAnim = function(){
			if ($scope.fadeInAnimCyc < 10){
				if ($scope.fadeInAnimCyc == 0){
					$scope.tab = $scope.pendTab;
					$scope.pendTab = 0;

					$scope.$apply();
				}
				var opacity = 1 - (($scope.fadeInAnimCyc + 1) * .1);
				$scope.targetIn.style.opacity = opacity;
				$scope.fadeInAnimCyc++;
			} else {
				clearInterval($scope.intervalFadeIn);

				$scope.targetIn.style.visibility = "hidden";
				$scope.targetOut.style.visibility = "hidden";
				$scope.fadeInAnimCyc = 0;
				var swapTarget = $scope.targetOut;
				$scope.targetOut = $scope.targetIn;
				$scope.targetIn = swapTarget;
				$scope.targetIn.style.opacity = 1;
				$scope.targetOut.style.opacity = 0;
			}
		};
		$scope.triggerFadeIn = function(){
			$scope.targetIn.style.visibility = "visible";
			$scope.intervalFadeIn = setInterval($scope.fadeInAnim, 100);
		};
		$scope.triggerFadeIn();
	}]);
})();