{{template "includes/header.tpl"}}
<body ng-controller="tabManager as tabM">
	<div id="animDiv">
		<img src="/static/img/temp_bread.png" class="backImg" id="bImg" style="z-index: 2;" />
		<img src="/static/img/temp_bread.png" class="backImg" id="bImgRev" style="z-index: -2;" />
		<div class="mainDiv" id="forwardMain" ng-show="tabM.isSelected(1)">
			<div class="headNav">
				<ul>
					<li ng-click="tabM.selectTab(1)"><h1>Map</h1></li>
					<li ng-click="tabM.selectTab(2)"><h1>Order</h1></li>
				</ul>
			</div>
			<div class="ratio contentHolder">
				<div id="map"></div>
			</div>
			<div class="footer"></div>
		</div>
		<div class="mainDiv" id="reverseMain" ng-show="tabM.isSelected(2)">
			<div class="headNav">
				<ul>
					<li ng-click="tabM.selectTab(1)"><h1>Map</h1></li>
					<li ng-click="tabM.selectTab(2)"><h1>Order</h1></li>
				</ul>
			</div>
			<div class="ratio contentHolder">
				<div id="orders" class="ratio" ng-controller="orderTabManager as oTabMan">
					<div class="sixtySix">
						<h2>Thank you for your interest!</h2>
						<p>Here you can get in contact us directly. Just select order for an advance large order or select comment if you just have something you would like to say.</p>
						<ul>
							<li ng-click="oTabMan.selectTab(1)"><h2>Order</h2></li>
							<li ng-click="oTabMan.selectTab(2)"><h2>Comment</h2></li>
						</ul>
					</div>
					<div ng-show="oTabMan.isSelected(1)" id="orderDiv"> 
						<div class="sixtySix">
							<h3>Order Up!</h3>
							<p>This is where you can place bulk orders in advance. Just give us a name, a phone number we can contact you at, and a brief description of what we might help you with.</p>
						</div>
						<form id="orderForm" name="orderForm" ng-controller="orderController as ordCont" ng-submit="orderForm.$valid && ordCont.submitOrder()" novalidate>
							<p><label for="">Name:</label><input type="text" maxlength="50" name="fullName" ng-model="ordCont.order.fullName" placeholder="Contact Name" required/></p>
							<p><label for="">Phone:</label><input type="tel" pattern="[0-9]{3}" name="phone1" id="phone1" ng-model="ordCont.order.phone1" maxlength="3" size="3" placeholder="555" required/>-
								<input type="tel" pattern="[0-9]{3}" name="phone2" id="phone2" ng-model="ordCont.order.phone2" maxlength="3" size="3" placeholder="555" required/>-
								<input type="tel" pattern="[0-9]{4}" name="phone3" id="phone3" ng-model="ordCont.order.phone3" maxlength="4" size="4" placeholder="5555" required/></p>
							<p><label for="">Details:</label><textarea name="details" ng-model="ordCont.order.details" placeholder="Give us some details of what we can help you with before we give you a call to confirm your order." required></textarea></p>
							<p><label for="human">Are you human?:</label>
								<label class="radio">								
									<input type="radio" name="human1901" ng-model="ordCont.order.human1901" value="veryHuman" >I am
								</label>
								<label class="radio">								
									<input type="radio" name="human1901" ng-model="ordCont.order.human1901" value="Icanttellyou">I am not
								</label></p>
							<p><button type="submit" name="submit" class="button">Get In Touch</button></p>
						</form>
					</div>
					<div ng-show="oTabMan.isSelected(2)" id="commentDiv">
						<div class="sixtySix">
							<h3>Can't Wait To Hear From You!</h3>
							<p>Here you can leave us your comments, concerns, etc. Just fill out the form including your name, email, and message.</p>
						</div>
						<form id="commentForm" name="commentForm" ng-controller="commentController as comCont" ng-submit="commentForm.$valid && comCont.submitOrder()" novalidate>
							<p><label for="">Name:</label><input type="text" maxlength="50" name="fullName" ng-model="comCont.comment.fullName" placeholder="Contact Name" required/></p>
							<p><label for="">Email:</label><input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}" name="email" id="email" ng-model="comCont.comment.email" placeholder="your@email.com" required/></p>
							<p><label for="">Comment:</label><textarea name="details" ng-model="comCont.comment.details" placeholder="Let us hear it." required></textarea></p>
							<p><label for="human">Are you human?:</label>
								<label class="radio">
									<input type="radio" name="human1901" ng-model="comCont.comment.human1901" value="veryHuman" />I am
								</label>
								<label class="radio">								
									<input type="radio" name="human1901" ng-model="comCont.comment.human1901" value="Icanttellyou" />I am not
								</label></p>
							<p><button type="submit" name="submit" class="button">Get In Touch</button></p>
						</form>
					</div>
				</div>
			</div>
			<div class="footer"></div>
		</div>
	</div>
	<script>
  	function initMap() {
    	var mapDiv = document.getElementById('map');
		var map = new google.maps.Map(mapDiv, {
      		center: {
      			lat: {{.coor.Latitude}},
      			lng: {{.coor.Longitude}}
      		}, 
      		zoom: 14,
      		disableDefaultUI: true,
      		streetViewControl: true
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
		var image1 = new google.maps.MarkerImage("http://192.168.0.3:8080/static/img/icon-foodtruck.png",
				null,
				null,
				null,
				new google.maps.Size(25, 25)
		);
		var marker1 = new google.maps.Marker({
			map: map,
			animation: google.maps.Animation.BOUNCE,
			position: {
				lat: {{.coor.Latitude}},
				lng: {{.coor.Longitude}}},
			icon: image1
		});
		var image2 = new google.maps.MarkerImage("http://192.168.0.3:8080/static/img/shadow.png",
				null,
				null,
				new google.maps.Point(12.5, 12.5),
				new google.maps.Size(25, 25)
		);
		var marker2 = new google.maps.Marker({
			map: map,
			position: {
				lat: {{.coor.Latitude}},
				lng: {{.coor.Longitude}}},
			icon: image2
		});
	}
  	</script>
	<script src="https://maps.googleapis.com/maps/api/js?callback=initMap" async defer></script>
	<script type="text/javascript">
	(function(){
		oCK = {{.OCKey}};
	})();
	</script>
</body>
</html>