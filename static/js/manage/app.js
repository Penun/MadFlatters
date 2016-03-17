(function(){
	var app = angular.module('flatterM', ['flatterM-coordinates', 'flatterM-orders']);
	app.controller('tabManager', ['$http', '$window', function($http, $window){
		this.tab = 1;
		this.selectTab = function(newTab){
			this.tab = newTab;
		};
		this.isSelected = function(checkT){
			return this.tab === checkT;
		};
		this.logOut = function(){
			$http.post('/logout', null).success(function(data){
				if (data.success) {
					$window.location.href = '/login';
				} else {
					console.log(data.error);
				}
			});
		}
	}]);
})();