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
    'ngProgress',
    'chart.js',
    'ngCsv',
    'TranslateModule',
    // always adding your module in conf
    'a1b4Datepicker',
    'datatable',
    'template',
    'category', 
    'item',
    'user',
    'charts'
  ])
  .config(function ($stateProvider, $urlRouterProvider, ChartJsProvider) {
    //$urlRouterProvider.otherwise('/user/login');
    $urlRouterProvider.otherwise(function($injector){
      var service = $injector.get('UserService');
      var retour = '/404'; // 404
      if(!service.isConnected())
        retour = '/'; // home
       return retour;
    });
    $stateProvider
    .state(
      'home', {
        url: '/',
        templateUrl: 'modules/main/view/main.html',
        controller: 'MainCtrl',
          controllerAs: 'main',
      }
    ).state(
      '404', {
        url: '/404',
        templateUrl: 'modules/main/view/404.html',
        controller: 'MainCtrl',
          controllerAs: 'main',
      }
    );
    // Configure all colors
    ChartJsProvider.setOptions({ 
      colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      responsive: true,
      showLines: true
    });
  }).run(function($state, $rootScope, ngProgressFactory, $window, TranslationService) {
    // $translationProvider
    TranslationService.init();

    // on insctancie la progressbar
    $rootScope.progressbar = ngProgressFactory.createInstance();
    $rootScope.progressbar.setColor('#5491f2');

    $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState) {
        $rootScope.progressbar.start();
    });

    $rootScope.$on('$stateChangeSuccess', function (evt, toState, toParams) {
        $rootScope.progressbar.complete();
    });

    $rootScope.$on('$stateNotFound', function (evt, notFound, fromState, fromParams) {
      $rootScope.progressbar.complete();
    });

    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
        $rootScope.progressbar.complete();
        $state.go("user.login");
    });
  });
  
  // define your modules here, don't forget to use global conf ['personnalExpenseApp']
  angular.module('a1b4Datepicker', ['personnalExpenseApp']);
  angular.module('item', ['personnalExpenseApp']);
  angular.module('user', ['personnalExpenseApp']);
  angular.module('datatable', ['personnalExpenseApp']);
  angular.module('template', ['personnalExpenseApp']);
  angular.module('category', ['personnalExpenseApp']);
  angular.module('charts', ['personnalExpenseApp']);
  angular.module('TranslateModule', ['personnalExpenseApp']);

