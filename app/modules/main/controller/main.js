'use strict';

/**
 * @ngdoc function
 * @name personnalExpenseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the personnalExpenseApp
 */
angular.module('personnalExpenseApp')
	.controller('MainCtrl', function () {
		function MainCtrlClass () {
			this.awesomeThings = [
				'HTML5 Boilerplate',
				'AngularJS',
				'Karma'
			];  
		}
		
		return new MainCtrlClass();
	});
