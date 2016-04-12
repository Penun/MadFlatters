(function(){
	var app = angular.module('flatter-orders', []);
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