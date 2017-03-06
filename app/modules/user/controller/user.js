'use strict';

/**
 * @ngdoc controller
 * @name personnalExpenseApp.controller:User
 * # User controller
 * @description Lead the user list
 */
angular.module('user')
  .controller('UserCtrl', function ($state, $filter, UserFactory, ItemManager, UserService) {

    function User() {
      this.factory = UserFactory;
      this.apply = null;
      this.service = UserService;
      this.data = {};
    }

    User.prototype = Object.create(ItemManager.__proto__);
    User.constructor = User;

    return new User();
  });
