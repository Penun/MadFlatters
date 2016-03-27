{{template "includes/header.tpl"}}
<body width="device-width" ng-controller="tabManager as tabM">
	<div id="mainDiv">
		<div>
			<ul>
				<li ng-click="tabM.selectTab(1)">Map</li>
				<li ng-click="tabM.selectTab(2)">Order</li>
			</ul>
		</div>
		<div id="contentHolder" class="ratio">
			<div id="map" ng-show="tabM.isSelected(1)"></div>
			<div id="orders" ng-show="tabM.isSelected(2)">
				<form id="orderForm" name="orderForm" ng-controller="orderController as ordCont" ng-submit="orderForm.$valid && ordCont.submitOrder()" novalidate>
					Name: <input type="text" maxlength="50" name="fullName" ng-model="ordCont.order.fullName" required/><br />
					Phone: <input type="text" pattern="[0-9]{3}" name="phone1" ng-model="ordCont.order.phone1" maxlength="3" required/>-<input type="text" pattern="[0-9]{3}" name="phone2" ng-model="ordCont.order.phone2" maxlength="3" required/>-<input type="text" pattern="[0-9]{4}" name="phone3" ng-model="ordCont.order.phone3" maxlength="4" required/><br />
					Order/Coment: <textarea name="details" ng-model="ordCont.order.details" required></textarea><br />
					<input type="submit" name="submit" value="Get In Touch" />
				</form>
			</div>
			<script>
	      	function initMap() {
	        	var mapDiv = document.getElementById('map');
	    		var map = new google.maps.Map(mapDiv, {
	          		center: {
	          			lat: {{.coor.Latitude}},
	          			lng: {{.coor.Longitude}} 
	          		}, 
	          		zoom: 15
	        	});
	        	map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
	        	map.set('styles', [
	        		{
	      				"featureType": "landscape",
	      				"elementType": "geometry", 
	      				"stylers": [{"color": "#DCCCB1"}]
	      			},{
	      				"featureType": "landscape", 
	      				"elementType": "labels.text.fill", 
	      				"stylers": [{"color": "#000000"}] 
	      			},{ 
	      				"featureType": "poi",
	      				"elementType": "geometry.fill", 
	      				"stylers": [{"color": "#783e23"}]
	      			},{ 
	      				"featureType": "road", 
	      				"elementType": "geometry.fill", 
	      				"stylers": [{"color": "#c7b29c"}]
	      			},{ 
	      				"featureType": "road", 
	      				"elementType": "labels.text.stroke", 
	      				"stylers": [{"color": "#d4b87f"}, {"weight": 5.4}] 
	      			},{ 
	      				"featureType": "water", 
	      				"elementType": "geometry.fill", 
	      				"stylers": [{"color": "#d5bc8e"}]
	      			},{ 
	      				"featureType": "poi", 
	      				"elementType": "labels.text.fill", 
	      				"stylers": [{"color": "#69321b"}]
	      			},{ 
	      				"featureType": "administrative", 
	      				"elementType": "labels.text.stroke", 
	      				"stylers": [{"color": "#5c2a1a"}, {"weight": 1.7 }]
	  				},{
	  					"featureType": "road", 
	      				"elementType": "labels.icon", 
	      				"stylers": [{"hue": "#c99e50"}]
	  				},{
	  					"featureType": "water", 
	      				"elementType": "labels.text.fill", 
	      				"stylers": [{"color": "#a68b77"}]
	  				},{
	  					"featureType": "poi", 
	      				"elementType": "labels.icon", 
	      				"stylers": [{"hue": "#673e2f"}]
	  				}
				]);
	     	}
	      	</script>
			<script src="https://maps.googleapis.com/maps/api/js?callback=initMap" async defer></script>
		</div>
	</div>
</body>
</html>