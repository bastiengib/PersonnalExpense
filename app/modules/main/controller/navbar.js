'use strict';

/**
 * @ngdoc function
 * @name personnalExpenseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the personnalExpenseApp
 */
angular.module('personnalExpenseApp')
	.controller('NavbarCtrl', function (UserService) {
		function MainCtrlClass () {
			this.UserService = UserService;  
		}
		
		return new MainCtrlClass();
	});