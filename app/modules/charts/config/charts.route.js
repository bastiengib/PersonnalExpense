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
                ChartsResolve: function ($stateParams, $state, ChartsFactory) {
                    //return ChartsFactory.getCharts().$promise;
                    return null;
                }
            }
        });
    }
);

