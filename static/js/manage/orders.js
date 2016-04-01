(function(){
	var app = angular.module('flatterM-orders', []);
	app.controller('ordersController', ['$http', '$scope', 'filterFilter', function($http, $scope, filterFilter){
		$scope.orders = curOrders;
		//this.hasLoaded = false;
		$scope.activeOrders = [];
		$scope.selectedOrders = function selectedOrders() {
			return filterFilter($scope.orders, {selected: true});
		}
		$scope.$watch('orders|filter:{selected:true}', function(nv){
			$scope.activeOrders = nv.map(function(order){
				return order.or_id;
			});
		}, true);
		this.Archive = function(){
			var arOrders = [];
			for (var i = 0; i < $scope.activeOrders.length; i++){
				var ordSt = '{"or_id":' + $scope.activeOrders[i] + '}';
				var ordObj = JSON.parse(ordSt);
				arOrders.push(ordObj);
			}
			if (arOrders.length > 0) {
				$http.post('/manage/orders', arOrders).success(function(data){
					if (data.success) {
						for (var i = 0; i < $scope.activeOrders.length; i++){
							for (var j = 0; j < $scope.orders.length; j++){
								if ($scope.activeOrders[i] == $scope.orders[j].or_id){
									$scope.orders.splice(j, 1);
								}
							}
						}
					} else {
						console.log(data.error);
					}
				});
			}
		};
		this.RevealDetails = function(or_id){
			for (var i = 0; i < $scope.orders.length; i++){
				if ($scope.orders[i].or_id == or_id){
					if ($scope.orders[i].showDetails == null || $scope.orders[i].showDetails == false) {
						$scope.orders[i].showDetails = true;
					} else {
						$scope.orders[i].showDetails = false;
					}
				}
			}
		};
	}]);
	app.controller('ordLenController', ['$scope', function($scope){
		this.ordLen = ordLength;
	}]);
})();