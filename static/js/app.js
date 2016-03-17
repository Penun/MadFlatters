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
	app.controller('loginController', ['$http', '$window', function($http, $window){
		var logCont = this;
		this.login = {};
		this.loginFailed = false;
		this.tryLogin = function(){
			$http.post('/login', this.login).success(function(data){
				if (data.success){
					$window.location.href = '/manage';
				} else {
					console.log(data.error);
					logCont.loginFailed = true;
				}
			});
			this.login = {};
		};
	}]);
})();