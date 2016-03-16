(function(){
	var app = angular.module('flatter', []);
	app.controller('tabManager', function(){
		this.tab = 1;
		this.selectTab = function(newTab){
			this.tab = newTab;
		};
		this.isSelected = function(checkT){
			return this.tab === checkT;
		};
	});
	app.controller('orderController', [ '$http', function($http){
		var ord_cont = this;
		this.submitFail = false;
		this.submitSuccess = false;
		this.order = {};
		this.submitOrder = function(){
			var sendData = {};
			sendData.fullName = this.order.fullName;
			sendData.phone = this.order.phone1 + '-' + this.order.phone2 + '-' + this.order.phone3
			sendData.details = this.order.details;
			$http.post('/contact', sendData).success(function(data){
				if (!data.hadError){
					ord_cont.submitSuccess = true;
				} else {
					ord_cont.submitFail = true;
				}
			});
			this.order = {};
		};
	}]);
})();