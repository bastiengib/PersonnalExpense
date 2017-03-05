'use strict';

/**
 * @ngdoc routing
 * @name personnalExpenseApp.route:Template
 * # Template route
 * @description All routes (& conf) for template module
 */
angular.module('template')
.config(
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('template', {
            abstract: true,            
            url: '/template',
            template: '<div ui-view></div>'
        }).state('template.list', {
            url: '/list',
            templateUrl: 'modules/template/view/template.html',
            controller: 'TemplateCtrl as template',
            resolve: {
                TemplateResolve: function ($stateParams, $state, TemplateFactory, UserService) {
                     var params = {
                        'token': UserService.user.token,
                        'user': UserService.user._id
                    };
                    return TemplateFactory.getAll(params).$promise;
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
        }).state('template.add', {
            url: '/new',
            templateUrl: 'modules/template/view/template.form.html',
            controller: 'TemplateFormCtrl as template',
            resolve: {
                CategoryResolve: function ($stateParams, $state, CategoryFactory, UserService) {
                    var params = {
                        'token': UserService.user.token,
                        'user': UserService.user._id
                    };
                    return CategoryFactory.getAll(params).$promise;
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
        .state('template.update', {
            url: '/:id',
            templateUrl: 'modules/template/view/template.form.html',
            controller: 'TemplateFormCtrl as template',
            resolve: {
                CategoryResolve: function ($stateParams, $state, CategoryFactory, UserService) {
                    var params = {
                        'token': UserService.user.token,
                        'user': UserService.user._id
                    };
                    return CategoryFactory.getAll(params).$promise;
                },
                FormResolve: function ($stateParams, $state, TemplateFactory, UserService) {
                    var _id = $stateParams.id === "" ? $state.params.id : $stateParams.id;
                    var params = {
                        'token': UserService.user.token,
                        'user': UserService.user._id,
                        'id': _id
                    };
                    return TemplateFactory.get(params).$promise;
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

