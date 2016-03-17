(function(){
	var app = angular.module('flatterM-upPassword', []);
	app.controller('upPassController', ['$http', function($http){
		this.passSet = {};
		this.updatePassword = function(){
			$http.post('/manage/password', this.passSet).success(function(data){
				if (data.success) {

				} else {

				}
			});
			this.passSet = {};
		};
	}]);
})();