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
			if (this.order.human1901 == "veryHuman"){
				var sendData = {};
				sendData.ord_com = 1;
				sendData.fullName = this.order.fullName;
				sendData.phone = this.order.phone1 + '-' + this.order.phone2 + '-' + this.order.phone3;
				sendData.details = this.order.details;
				sendData.human1901 = this.order.human1901;
				sendData.oCK = oCK;			
				$http.post('/contact', sendData).success(function(data){
					if (data.response != null){
						var orderDiv = document.getElementById("orderDiv");
						orderDiv.innerHTML = data.response;
					}
				});
				this.order = {};
			}
		};
	}]);
	app.controller('commentController', [ '$http', function($http){
		this.comment = {};
		this.submitOrder = function(){
			var sendData = {};
			sendData.ord_com = 0;
			sendData.fullName = this.comment.fullName;
			sendData.email = this.comment.email;
			sendData.details = this.comment.details;
			sendData.human1901 = this.comment.human1901;
			sendData.oCK = oCK;
			$http.post('/contact', sendData).success(function(data){
				if (data.response != null){
					var commentDiv = document.getElementById("commentDiv");
					commentDiv.innerHTML = data.response;
				}
			});
			this.comment = {};
		};
	}]);
})();