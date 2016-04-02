(function(){
	var app = angular.module('flatterM-orders', []);
	app.controller('ordersController', ['$http', '$scope', 'filterFilter', function($http, $scope, filterFilter){
		$scope.orders = curOrders;
		$scope.activeOrders = [];
		$scope.selectedOrders = function selectedOrders() {
			return filterFilter($scope.orders, {selected: true});
		}
		$scope.$watch('orders|filter:{selected:true}', function(nv){
			if (nv != null){
				$scope.activeOrders = nv.map(function(order){
					return order.or_id;
				});
			}
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
							for (var j = 0; j < curOrders.length; j++){
								if ($scope.activeOrders[i] == curOrders[j].or_id){
									curOrders.splice(j, 1);
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
			for (var i = 0; i < curOrders.length; i++){
				if (curOrders[i].or_id == or_id){
					if (curOrders[i].showDetails == null || !curOrders[i].showDetails) {
						curOrders[i].showDetails = true;
					} else {
						curOrders[i].showDetails = false;
					}
				}
			}
		};
	}]);
	app.controller('ordLenController', ['$scope', function($scope){
		$scope.orders = curOrders;
		$scope.ordLen = curOrders.length;
		$scope.$watch('orders.length', function(newValue){
			$scope.ordLen = $scope.orders.length;
		})
	}]);
})();