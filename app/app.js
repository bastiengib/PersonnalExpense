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
    'bootstrap-datepicker',
    'colorpicker.module',
    // always adding your module in conf
    'datatable',
    'template',
    'category', 
    'item',
    'user'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/user/login');
    $stateProvider
    .state(
      'home', {
        url: '/',
        templateUrl: 'modules/main/view/main.html',
        controller: 'MainCtrl',
          controllerAs: 'main',
      }
    );
  }).run(function($state,$rootScope) {
    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
        $state.go("user.login");
    });
  });
  
  // define your modules here, don't forget to use global conf ['personnalExpenseApp']
  angular.module('item', ['personnalExpenseApp']);
  angular.module('user', ['personnalExpenseApp']);
  angular.module('datatable', ['personnalExpenseApp']);
  angular.module('template', ['personnalExpenseApp']);
  angular.module('category', ['personnalExpenseApp']);

