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
                DatatableResolve: function ($stateParams, $state, DatatableFactory, UserService, DatatableService) {
                    var params = {
                        'token': UserService.user.token,
                        'user': UserService.user._id,
                        'o' : DatatableService.page * DatatableService.limit,
                        'l' : DatatableService.limit,
                        's' : DatatableService.sort
                    };
                    return DatatableFactory.getAll(params).$promise;
                },
                CategoryResolve: function ($stateParams, $state, CategoryFactory, UserService) {
                    var params = {
                        'token': UserService.user.token,
                        'user': UserService.user._id
                    };
                    return CategoryFactory.getAll(params).$promise;
                },
                auth: function ($stateParams, $state, UserFactory, UserService) {
                    var params = {
                        'token': UserService.user.token,
                        'user': UserService.user._id
                    };
                    return UserService.isConnectedResolve($stateParams, $state, UserFactory.checkConnexion(params).$promise);
                } 
            }
        }).state('datatable.add', {
            url: '/new',
            templateUrl: 'modules/datatable/view/datatable.form.html',
            controller: 'DatatableFormCtrl as datatable',
            resolve: {
                CategoryResolve: function ($stateParams, $state, CategoryFactory, UserService) {
                    var params = {
                        'token': UserService.user.token,
                        'user': UserService.user._id
                    };
                    return $stateParams, $state, CategoryFactory.getAll(params).$promise;
                },
                FormResolve: function () {
                    return null;
                },
                auth: function ($stateParams, $state, UserFactory, UserService) {
                    var params = {
                        'token': UserService.user.token,
                        'user': UserService.user._id
                    };
                    return UserService.isConnectedResolve($stateParams, $state, UserFactory.checkConnexion(params).$promise);
                }
            }
        })
        .state('datatable.update', {
            url: '/:id',
            templateUrl: 'modules/datatable/view/datatable.form.html',
            controller: 'DatatableFormCtrl as datatable',
            resolve: {
                CategoryResolve: function ($stateParams, $state, CategoryFactory, UserService) {
                    var params = {
                        'token': UserService.user.token,
                        'user': UserService.user._id
                    };
                    return CategoryFactory.getAll(params).$promise;
                },
                FormResolve: function ($stateParams, $state, DatatableFactory, UserService) {
                    var _id = $stateParams.id === "" ? $state.params.id : $stateParams.id;
                    var params = {
                        'token': UserService.user.token,
                        'user': UserService.user._id,
                        'id': _id
                    };
                    return DatatableFactory.get(params).$promise;
                },
                auth: function ($stateParams, $state, UserFactory, UserService) {
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

