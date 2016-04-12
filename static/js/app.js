(function(){
	var app = angular.module('flatter', []);
	app.controller('tabManager', ['$scope', function($scope){
		this.tab = 1;
		$scope.curScale = 1;
		$scope.animDiv = document.getElementById("animDiv");
		$scope.scalOut = true;
		$scope.interval = null;

		this.selectTab = function(newTab){
			this.tab = newTab;
			$scope.interval = setInterval(this.flipAnim, 20);
		};
		this.isSelected = function(checkT){
			return this.tab === checkT;
		};
		this.flipAnim = function(){
			if ($scope.scalOut){
				$scope.curScale -= 0.05;
				if ($scope.curScale <= 0.5){
					$scope.scalOut = false;
				}
			} else {
				$scope.curScale += 0.05;
				if ($scope.curScale >= 1){
					$scope.curScale = 1;
					$scope.scalOut = true;
					clearInterval($scope.interval);
				}
			}

			$scope.animDiv.style.transform = "scale3d(" + $scope.curScale + ", " + $scope.curScale + ", " + $scope.curScale +")";
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