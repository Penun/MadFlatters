(function(){
	var app = angular.module('flatterM', ['flatterM-coordinates', 'flatterM-orders']);
	app.controller('tabManager', function(){
		this.tab = 1;
		this.selectTab = function(newTab){
			this.tab = newTab;
		};
		this.isSelected = function(checkT){
			return this.tab === checkT;
		};
	});
})();