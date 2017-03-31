'use strict';

/**
 * @ngdoc routing
 * @name personnalExpenseApp.route:charts
 * # charts route
 * @description All routes (& conf) for charts module
 */
angular.module('charts')
.config(
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('charts', {
            url: '/charts',
            templateUrl: 'modules/charts/view/charts.html',
            controller: 'ChartsCtrl as charts',
            resolve: {
                ChartsResolve: function ($stateParams, $state, ChartsFactory, UserService, ChartsService) {
                     var params = {
                        'token': UserService.user.token,
                        'user': UserService.user._id,
                        'verb': ChartsService.verb,
                        'y': ChartsService.year,
                        'm': ChartsService.month + 1 
                    };
                    return ChartsFactory.getCharts(params).$promise;
                }, CategoryResolve: function ($stateParams, $state, CategoryFactory, UserService) {
                    var params = {
                        'token': UserService.user.token,
                        'user': UserService.user._id
                    };
                    return CategoryFactory.getAll(params).$promise;
                }, auth: function ($stateParams, $state, UserFactory, UserService) {
                    var params = {
                        'token': UserService.user.token,
                        'user': UserService.user._id
                    };
                    return UserService.isConnectedResolve($stateParams, $state, UserFactory.checkConnexion(params).$promise);
                }
            }
        });
    }
);

