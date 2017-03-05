'use strict';

/**
 * @ngdoc controller
 * @name personnalExpenseApp.controller:User
 * # User controller
 * @description Lead the user list
 */
angular.module('user')
  .service('UserService', function (UserFactory, Notification, $state, $cookies) {

    function User() {
        this.factory = UserFactory;
        this.user = {
            token: null,
            _id: null,
            firstname: null,
            lastname: null,
            username: null
        };

        var favoriteCookie = $cookies.getObject('PersonnalExpense');        
        console.log(favoriteCookie);
        if (favoriteCookie)
            this.user = favoriteCookie;
    }

    User.prototype.isConnectedResolve = function($stateParams, $state, $promise) {
        return $promise.then(function(datas) {
            return datas;
        }, function (error) {
            if (error.status = 401) {
                Notification.error({ message: error.data.message, title: 'Not Connected' });
                return $q.reject({ authenticated: false });
            }
        }.bind(this));
    }

    User.prototype.isConnected = function() {
        return this.token ? true : false;
    }

    User.prototype.connect = function () {
        var params = {
            token: this.user.token,
            username: this.user.username,
            password: this.user.password
        };

        this.factory.connect({verb: 'connect'}, params, function (user) {
            this.user = user.item;
            $cookies.putObject('PersonnalExpense', this.user);
            Notification.info({ title: 'Connected', message: 'Hello '+this.user.username });
            $state.go('datatable.list');
        }.bind(this), function (error) {
            Notification.error({ message: error.status + ' - ' + error.data.message, title: 'Error (' + error.status + ')' });
        }.bind(this));
    }

    User.prototype.disconnect = function () {
        var params = {
            token: this.user.token,
            user: this.user._id
        };

        this.factory.disconnect({verb: 'disconnect'}, params, function (user) {
            $cookies.remove('PersonnalExpense');
            Notification.info({ title: 'Disconnected', message: 'Goodbye '+this.user.username+'!' });
            this.user = user.item;
            $state.go('user.login');
        }.bind(this), function (error) {
            Notification.error({ message: error.status + ' - ' + error.data.message, title: 'Error (' + error.status + ')' });
        }.bind(this));
    }

    return new User();
  });
