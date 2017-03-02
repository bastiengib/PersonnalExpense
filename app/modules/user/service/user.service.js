'use strict';

/**
 * @ngdoc controller
 * @name personnalExpenseApp.controller:User
 * # User controller
 * @description Lead the user list
 */
angular.module('user')
  .service('UserService', function (UserFactory, Notification) {

    function User() {
        this.factory = UserFactory;
        this.user = {
            token: null,
            firstname: null,
            lastname: null,
            pseudo: null
        };
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
        }.bind(this), function (error) {
            Notification.error({ message: error.status + ' - ' + error.data.message, title: 'Error (' + error.status + ')' });
        }.bind(this));
    }

    return new User();
  });
