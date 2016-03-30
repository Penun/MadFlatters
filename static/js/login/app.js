(function(){
	var app = angular.module('flatterL', []);
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