'use strict';

/**
 * @ngdoc controller
 * @name personnalExpenseApp.controller:User
 * # User controller
 * @description Lead the user list
 */
angular.module('user')
  .service('UserService', function (UserFactory, Notification, $state) {

    function User() {
        this.factory = UserFactory;
        this.user = {
            token: null,
            _id: null,
            firstname: null,
            lastname: null,
            pseudo: null
        };
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
            pseudo: this.user.pseudo,
            password: this.user.password
        };

        this.factory.connect({verb: 'connect'}, params, function (user) {
            this.user = user.item;
            Notification.success({ message: 'connected', title: 'Hello '+this.user.pseudo });
            $state.go('datatable.list');
        }.bind(this), function (error) {
            Notification.error({ message: error.status + ' - ' + error.data.message, title: 'Error (' + error.status + ')' });
        }.bind(this));
    }

    return new User();
  });
