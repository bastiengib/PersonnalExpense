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
                },
                auth : function (UserService, $q) {
                    return UserService.isConnected() ? true : $q.reject({ authenticated: false });
                }
            }
        }).state('datatable.add', {
            url: '/new',
            templateUrl: 'modules/datatable/view/datatable.form.html',
            controller: 'DatatableFormCtrl as datatable',
            resolve: {
                CategoryResolve: function ($stateParams, $state, CategoryFactory) {
                    return CategoryFactory.getAll().$promise;
                },
                FormResolve: function () {
                    return null;
                }
            }
        })
        .state('datatable.update', {
            url: '/:id',
            templateUrl: 'modules/datatable/view/datatable.form.html',
            controller: 'DatatableFormCtrl as datatable',
            resolve: {
                CategoryResolve: function ($stateParams, $state, CategoryFactory) {
                    return CategoryFactory.getAll().$promise;
                },
                FormResolve: function ($stateParams, $state, DatatableFactory) {
                    var _id = $stateParams.id === "" ? $state.params.id : $stateParams.id;
                    return DatatableFactory.get({id:_id}).$promise;
                }
            }
        });
    }
);

