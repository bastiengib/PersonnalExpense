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
                TemplateResolve: function ($stateParams, $state, TemplateFactory) {
                    return TemplateFactory.getAll().$promise;
                },
                CategoryResolve: function ($stateParams, $state, CategoryFactory) {
                    return CategoryFactory.getAll().$promise;
                }
            }
        }).state('template.add', {
            url: '/new',
            templateUrl: 'modules/template/view/template.form.html',
            controller: 'TemplateFormCtrl as template',
            resolve: {
                CategoryResolve: function ($stateParams, $state, CategoryFactory) {
                    return CategoryFactory.getAll().$promise;
                },
                FormResolve: function () {
                    return null;
                }
            }
        })
        .state('template.update', {
            url: '/:id',
            templateUrl: 'modules/template/view/template.form.html',
            controller: 'TemplateFormCtrl as template',
            resolve: {
                CategoryResolve: function ($stateParams, $state, CategoryFactory) {
                    return CategoryFactory.getAll().$promise;
                },
                FormResolve: function ($stateParams, $state, TemplateFactory) {
                    var _id = $stateParams.id === "" ? $state.params.id : $stateParams.id;
                    return TemplateFactory.get({id:_id}).$promise;
                }
            }
        });
    }
);

