'use strict';

/**
 * @ngdoc overview
 * @name personnalExpenseApp
 * @description inital configuration
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
    'ngTouch',
    'ui-notification',
    // always adding your module in conf
    'datatable',
    'category', 
    'item'
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
    );
  });
  
  // define your modules here, don't forget to use global conf ['personnalExpenseApp']
  angular.module('item', ['personnalExpenseApp']);
  angular.module('datatable', ['personnalExpenseApp']);
  angular.module('category', ['personnalExpenseApp']);

