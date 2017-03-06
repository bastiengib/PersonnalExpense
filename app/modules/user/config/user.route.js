angular.module('user')
.config(
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('user', {
            abstract: true,            
            url: '/user',
            template: '<div ui-view></div>'
        }).state('user.add', {
            url: '/inscription',
            templateUrl: 'modules/user/view/inscription.html',
            controller: 'UserCtrl as user'
        }).state('user.login', {
            url: '/login',
            templateUrl: 'modules/user/view/login.html',
            controller: 'UserCtrl as user'
        }).state('user.update', {
            url: '/account',
            templateUrl: 'modules/user/view/update.html',
            controller: 'UserCtrl as user'
        });
    }
);