'use strict';

/**
 * @ngdoc routing
 * @name personnalExpenseApp.route:category
 * # category route
 * @description All routes (& conf) for category module
 */
angular.module('category')
.config(
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('category', {
            abstract: true,            
            url: '/category',
            template: '<div ui-view></div>'
        }).state('category.list', {
            url: '/list',
            templateUrl: 'modules/category/view/category.html',
            controller: 'CategoryCtrl as category',
            resolve: {
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
        });
    }
);

