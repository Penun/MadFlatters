(function(){
	var app = angular.module('flatter', []);
	app.controller('tabManager', ['$scope', function($scope){
		this.tab = 1;
		$scope.animDiv = document.getElementById("animDiv");
		$scope.curScale = 1;
		$scope.curTrans = 0;
		$scope.curDeg = 0;
		$scope.flipOut = true;
		$scope.flipRight = true;
		$scope.interval = null;

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
				$scope.curTrans += 1.5;
				if ($scope.flipRight){
					$scope.curDeg += 9;
				} else {
					$scope.curDeg -= 9;
				}
				if ($scope.curScale <= 0.5){
					$scope.flipOut = false;
				}
			} else {
				$scope.curScale += 0.05;
				$scope.curTrans -= 1.5;
				if ($scope.flipRight){
					$scope.curDeg += 9;
				} else {
					$scope.curDeg -= 9;
				}
				if ($scope.curScale >= 1){
					$scope.curScale = 1;
					$scope.curTrans = 0;
					if ($scope.flipRight){
						$scope.curDeg = 180;
						$scope.flipRight = false;
					} else {
						$scope.curDeg = 0;
						$scope.flipRight = true;
					}
					$scope.flipOut = true;
					clearInterval($scope.interval);
				}
			}

			$scope.animDiv.style.transform = "scale3d(" + $scope.curScale + ", " + $scope.curScale + ", " + $scope.curScale +") translateY(-" + $scope.curTrans + "vw) rotateY(" + $scope.curDeg + "deg)";
		};
	}]);
	app.controller('orderController', [ '$http', function($http){
		this.order = {};
		this.submitOrder = function(){
			var sendData = {};
			sendData.fullName = this.order.fullName;
			sendData.phone = this.order.phone1 + '-' + this.order.phone2 + '-' + this.order.phone3
			sendData.details = this.order.details;
			$http.post('/contact', sendData).success(function(data){
				if (data.success){
					// Needs confirm message swap
				} else {
					console.log(data.error);
				}
			});
			this.order = {};
		};
	}]);
})();