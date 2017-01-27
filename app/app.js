'use strict';

/**
 * @ngdoc overview
 * @name personnalExpenseApp
 * @description
 * # personnalExpenseApp
 *
 * Main module of the application.
 */
angular
  .module('personnalExpenseApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
	.state(
		'home', {
			url: '/',
			templateUrl: 'modules/main/view/main.html',
			controller: 'MainCtrl',
        controllerAs: 'main',
		}
	).state(
		'about', {
			url: '/about',
			templateUrl: 'modules/about/view/about.html',
			controller: 'AboutCtrl',
      controllerAs: 'about',
		}
	);
  });
