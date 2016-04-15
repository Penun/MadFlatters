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
		$scope.animDiv = document.getElementById("animDiv");
		$scope.curScale = 1;
		$scope.curTransY = 0;
		$scope.curTransX = 0;
		$scope.curDeg = 0;
		$scope.flipOut = true;
		$scope.AnimState = Constants.FlipAnimStates.PRE;
		$scope.animCycles = 0;
		$scope.flipRight = true;
		$scope.interval = null;

		if (document.documentElement.clientWidth >= 1366){
			$scope.cappedWidth = true;
		} else {
			$scope.cappedWidth = false;
		}

		this.selectTab = function(newTab){
			if ($scope.tab != newTab && $scope.AnimState == Constants.FlipAnimStates.PRE){
				$scope.tab = newTab;
				$scope.interval = setInterval(this.flipAnim, 60);
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
					if ($scope.animCycles < 5){
						$scope.curScale -= 0.05;
						$scope.curTransY += 1.5;
						if ($scope.flipRight){
							if ($scope.cappedWidth){
								$scope.curTransX -= 136.6;
							} else {
								$scope.curTransX -= 10;
							}
						} 
						$scope.animCycles++;
					} else {
						$scope.AnimState = Constants.FlipAnimStates.ROTATE;
					}
				break;
				case Constants.FlipAnimStates.ROTATE:
					if ($scope.animCycles < 15){
						if ($scope.flipRight){
							$scope.curDeg += 18;
						} else {
							$scope.curDeg -= 18;
						}
						if ($scope.animCycles < 10){
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
						$scope.animCycles++;
					} else {
						$scope.AnimState = Constants.FlipAnimStates.DROP;
					}
				break;
				case Constants.FlipAnimStates.DROP:
					if ($scope.animCycles < 25){
						$scope.curScale += 0.05;
						$scope.curTransY -= 1.5;
						if (!$scope.flipRight){
							if ($scope.cappedWidth){
								$scope.curTransX += 136.6;
							} else {
								$scope.curTransX += 10;
							}
						}
						$scope.animCycles++;
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
					$scope.animCycles = 0;
					clearInterval($scope.interval);
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

		$scope.triggerFade = function(){
			$scope.tab = 1;
		};
		$scope.fadeAnim = function(){

		};
		$scope.triggerFade();
	}]);
})();