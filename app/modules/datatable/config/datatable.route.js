'use strict';

/**
 * @ngdoc routing
 * @name personnalExpenseApp.route:Datatable
 * # Datatable route
 * @description All routes (& conf) for datatable module
 */
angular.module('datatable')
.config(
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('datatable', {
            abstract: true,            
            url: '/datatable',
            template: '<div ui-view></div>'
        }).state('datatable.list', {
            url: '/list',
            templateUrl: 'modules/datatable/view/datatable.html',
            controller: 'DatatableCtrl as datatable',
            resolve: {
                DatatableResolve: function ($stateParams, $state, DatatableFactory) {
                    return DatatableFactory.getAll().$promise;
                },
                CategoryResolve: function ($stateParams, $state, CategoryFactory) {
                    return CategoryFactory.getAll().$promise;
                }
            }
        });
    }
);

