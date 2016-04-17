(function(){
	var app = angular.module('flatter-orders', []);
	app.controller('orderTabManager', function(){
		this.oOderC = 0;
		this.selectTab = function(newTab){
			if (this.oOderC != newTab){
				this.oOderC = newTab;
			}
		};
		this.isSelected = function(checkT){
			return this.oOderC === checkT;
		};
	});
	app.controller('orderController', [ '$http', function($http){
		this.order = {};
		this.submitOrder = function(){
			var sendData = {};
			sendData.oOderC = true;
			sendData.fullName = this.order.fullName;
			sendData.phone = this.order.phone1 + '-' + this.order.phone2 + '-' + this.order.phone3;
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
	app.controller('commentController', [ '$http', function($http){
		this.comment = {};
		this.submitOrder = function(){
			var sendData = {};
			sendData.oOderC = false;
			sendData.fullName = this.comment.fullName;
			sendData.email = this.comment.email;
			sendData.details = this.comment.details;
			$http.post('/contact', sendData).success(function(data){
				if (data.success){
					// Needs confirm message swap
				} else {
					console.log(data.error);
				}
			});
			this.comment = {};
		};
	}]);
})();