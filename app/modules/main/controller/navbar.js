'use strict';

/**
 * @ngdoc function
 * @name personnalExpenseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the personnalExpenseApp
 */
angular.module('personnalExpenseApp')
	.controller('NavbarCtrl', function (UserService, TranslationService) {
		function MainCtrlClass () {
			this.UserService = UserService;
			this.translation = TranslationService;
		}
		
		return new MainCtrlClass();
	});