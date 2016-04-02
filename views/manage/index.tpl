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
			ordLength = {{.OrdLen}};
		})();
	</script>
	<div id="navPanel">
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
			<div>
				<span ng-hide="coordCont.nCoord.nCoordSet"><a href="" ng-click="coordCont.GetNewLocation()" class="button">Set New Coordinates</a></span>
				<span ng-show="coordCont.nCoord.nCoordSet"><a href="" ng-click="coordCont.UpdateLocation()" class="button">Confirm Updated Coordinates</a></span>
			</div>
		</div>
		<div id="orderTab" ng-show="tabM.isSelected(2)" ng-controller="ordersController as ordCont">
			<div ng-repeat="order in orders" class="oWrapper">
				<input type="checkbox" name="selectedOrders[]" value="{{"{{order.or_id}}"}}" ng-model="order.selected" />
				<div class="order" ng-click="ordCont.RevealDetails(order.or_id)"><b><i>{{"{{order.fullName}}"}}</i></b></div><div class="order" ng-click="ordCont.RevealDetails(order.or_id)"><b>{{"{{order.phone}}"}}</b></div><br />
				<p ng-show="order.showDetails" class="details">{{"{{order.details}}"}}</p>
			</div>
			<div>
				<a href="" ng-click="ordCont.Archive()" class="button">Archive Selected</a>
			</div>
		</div>
		<div id="upPassTab" ng-controller="upPassController as upPCont" ng-show="tabM.isSelected(3)">
			<form id="passForm" name="passForm" ng-submit="passForm.$valid && upPCont.updatePassword()"  novalidate>
				<p><label>Current Password:</label><input type="password" name="curPass" ng-model="upPCont.passSet.curPass" required/><br /></p>
				<p><label>New Password:</label><input type="password" name="newPass" ng-model="upPCont.passSet.newPass" required/><br /></p>
				<p><label>Confirm:</label><input type="password" name="conPass" ng-model="upPCont.passSet.conPass" required/><br /></p>
				<button type="submit" name="submit" class="button">Submit</button>
			</form>
			<div ng-show="upPCont.uploadError" id="upPassError">
			</div>
		</div>
	</div>
</body>
</html>