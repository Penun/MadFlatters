(function(){
	var app = angular.module('flatterM-coordinates', []);
	app.controller('coordinatesController', [ '$http', '$scope', function($http, $scope){
		this.nCoord = newCoord;
		this.cuCoord = curCoord;
		this.GetNewLocation = function(){
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(this.handleNewCoord, function(error){
					console.log(error.code);
				}); 
			} else {
				console.log("missing locater");
			}
		};
		this.handleNewCoord = function(position){
			newCoord.Latitude = position.coords.latitude;
			newCoord.Longitude = position.coords.longitude;
			newCoord.nCoordSet = true;
			$scope.$apply();
		};
		this.UpdateLocation = function(){
			this.nCoord.Latitude = Math.round(this.nCoord.Latitude*10000000)/10000000;
			this.nCoord.Longitude = Math.round(this.nCoord.Longitude*10000000)/10000000;
			$http.post("/manage/coordinates", this.nCoord).success(function(data){
				if (data.success){
					curCoord.Latitude = newCoord.Latitude;
					curCoord.Longitude = newCoord.Longitude;
					newCoord.Latitude = 0.00;
					newCoord.Longitude = 0.00;
					newCoord.nCoordSet = false;
					$scope.$apply();
				}
				else{
					console.log(data.error);
				}		
			});
		};
	}]);
	var newCoord = {
		Latitude: 0.00,
		Longitude: 0.00,
		nCoordSet: false
	};
})();