{{template "manage/includes/header.tpl"}}
<body width="device-width" ng-controller="tabManager as tabM">
	<script type="text/javascript">
		(function(){
			curCoord = {
				Latitude: {{.Coor.Latitude}},
				Longitude: {{.Coor.Longitude}},
				cuCoordSet: {{.Found}}
			};
			curOrders = {{.Orders}};
		})();
	</script>
	<div>
		{{template "manage/includes/nav.html"}}
	</div>
	<div>
		<div id="coordTab" ng-controller="coordinatesController as coordCont" ng-show="tabM.isSelected(1)">
			<div>
				<p ng-show="coordCont.cuCoord.cuCoordSet"><span>Current Latitude: {{"{{coordCont.cuCoord.Latitude}}"}}</span> :: <span>Current Longitude: {{"{{coordCont.cuCoord.Longitude}}"}}</span></p>
				<p ng-show="coordCont.nCoord.nCoordSet"><span>New Latitude: {{"{{coordCont.nCoord.Latitude}}"}}</span> :: <span>New Longitude: {{"{{coordCont.nCoord.Longitude}}"}}</span>
			</div>
			<span>
				<ul>
					<li ng-click="coordCont.GetNewLocation()">Get New Location</li>
					<li ng-click="coordCont.UpdateLocation()" ng-show="coordCont.nCoord.nCoordSet">Confirm Updated Location</li>
				</ul>
			</span>
		</div>
		<div id="orderTab" ng-show="tabM.isSelected(2)" ng-controller="ordersController as ordCont">
			<form id="orderForm">
				<div ng-repeat="order in orders">
					<input type="checkbox" name="selectedOrders[]" value="{{"{{order.or_id}}"}}" ng-model="order.selected" />
					<span>{{"{{order.fullName}}"}} :: {{"{{order.phone}}"}}</span><button type="button" ng-click="ordCont.RevealDetails(order.or_id)">...></button>
					<p ng-show="order.showDetails">{{"{{order.details}}"}}</p>
				</div>
				<button type="button" ng-click="ordCont.Archive()">Archive Selected</button>
			</form>
		</div>
		<div id="upPassTab" ng-show="tabM.isSelected(3)">
			<form id="passForm" novalidate>
				Current Password: <input type="password" name="curPass" />
				New Password: <input type="password" name="newPass"/>
				Confirm: <input type="password" name="conPass" />
				<button type="button">Submit</button>
			</form>
		</div>
	</div>
</body>
</html>