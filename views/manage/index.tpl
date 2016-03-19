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
	<div id="sidePanel">
		{{template "manage/includes/nav.html"}}
	</div>
	<div id="mainPanel">
		<div id="coordTab" ng-controller="coordinatesController as coordCont" ng-show="tabM.isSelected(1)">
			<div>
				<p><span ng-show="coordCont.cuCoord.cuCoordSet">Current Latitude: {{"{{coordCont.cuCoord.Latitude}}"}}</span><br />
					<span ng-show="coordCont.nCoord.nCoordSet"><b>New Latitude: {{"{{coordCont.nCoord.Latitude}}"}}</b></span></p>
				<p><span ng-show="coordCont.cuCoord.cuCoordSet">Current Longitude: {{"{{coordCont.cuCoord.Longitude}}"}}</span><br />
					<span ng-show="coordCont.nCoord.nCoordSet"><b>New Longitude: {{"{{coordCont.nCoord.Longitude}}"}}</b></span>
			</div>
			<span>
				<ul>
					<li ng-hide="coordCont.nCoord.nCoordSet"><button ng-click="coordCont.GetNewLocation()" type="button">Set New Coordinates</button></li>
					<li ng-show="coordCont.nCoord.nCoordSet"><button ng-click="coordCont.UpdateLocation()" type="button">Confirm Updated Coordinates</button></li>
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
		<div id="upPassTab" ng-controller="upPassController as upPCont" ng-show="tabM.isSelected(3)">
			<form id="passForm" name="passForm" ng-submit="passForm.$valid && upPCont.updatePassword()"  novalidate>
				Current Password: <input type="password" name="curPass" ng-model="upPCont.passSet.curPass" required/><br />
				New Password: <input type="password" name="newPass" ng-model="upPCont.passSet.newPass" required/><br />
				Confirm: <input type="password" name="conPass" ng-model="upPCont.passSet.conPass" required/><br />
				<input type="submit" name="submit" value="Submit" />
			</form>
			<div ng-show="upPCont.uploadError" id="upPassError">
			</div>
		</div>
	</div>
</body>
</html>