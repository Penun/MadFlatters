{{template "includes/header.tpl"}}
<body width="device-width">
	<div ng-controller="loginController as logCont">
		<div ng-show="logCont.loginFailed">Login Failed</div>
		<form id="loginForm" name="loginForm" ng-submit="loginForm.$valid && logCont.tryLogin()" novalidate>
			<p><label for="userName">Username:</label><input type="text" name="userName" ng-model="logCont.login.userName" required/><br /></p>
			<p><label for="password">Password:</label><input type="password" name="password" ng-model="logCont.login.password" required/><br /></p>
			<br />
			<button type="submit" name="submit">Login</button> 
		</form>
	</div>
</body>
</html>