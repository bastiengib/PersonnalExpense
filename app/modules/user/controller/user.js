'use strict';

/**
 * @ngdoc controller
 * @name personnalExpenseApp.controller:User
 * # User controller
 * @description Lead the user list
 */
angular.module('user')
  .controller('UserCtrl', function ($scope, $filter, UserFactory, ItemManager, UserService, DatatableService, TranslationService) {

    function User() {
      this.factory = UserFactory;
      this.apply = null;
      this.service = UserService;
      this.dservice = DatatableService;
      this.data = {};
      this.form = {export_date: new Date()};
      this.languages = TranslationService.languages;
    }

    User.prototype = Object.create(ItemManager.__proto__);
    User.constructor = User;

    return new User();
  });
