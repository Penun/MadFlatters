(function(){
	var app = angular.module('flatterM-upPassword', []);
	app.controller('upPassController', ['$http', '$scope', function($http, $scope){
		var upPassCont = this;
		this.passSet = {};
		this.uploadError = false;
		this.updatePassword = function(){
			if (this.passSet.newPass == this.passSet.conPass){
				$http.post('/manage/password', this.passSet).success(function(data){
					if (data.success) {
						upPassCont.uploadError = false;
					} else {
						upPassCont.uploadError = true;
						document.getElementById("upPassError").innerHTML = data.error;
					}
				});
				this.passSet = {};
			} else {
				document.getElementById("upPassError").innerHTML = "New Passwords Do Not Match";
				upPassCont.uploadError = true;
			}
		};
	}]);
})();