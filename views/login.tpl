{{template "includes/header.tpl"}}
<body width="device-width">
	<div ng-controller="loginController as logCont">
		<div ng-show="logCont.loginFailed">Login Failed</div>
		<form id="loginForm" name="loginForm" ng-submit="loginForm.$valid && logCont.tryLogin()" novalidate>
			Username: <input type="text" name="userName" ng-model="logCont.login.userName" required/><br />
			Password: <input type="password" name="password" ng-model="logCont.login.password" required/><br />
			<input type="submit" name="submit" value="Login" /> 
		</form>
	</div>
</body>
</html>