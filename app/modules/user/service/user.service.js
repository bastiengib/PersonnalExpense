'use strict';

/**
 * @ngdoc controller
 * @name personnalExpenseApp.controller:User
 * # User controller
 * @description Lead the user list
 */
angular.module('user')
  .service('UserService', function (UserFactory, Notification, $state, TranslationService, $cookies, $filter, $window) {

    function User() {
        this.factory = UserFactory;
        this.user = {
            token: null,
            _id: null,
            firstname: null,
            lastname: null,
            username: null,
            lang: null
        };

        var favoriteCookie = $cookies.getObject('PersonnalExpense');        
        
        if (favoriteCookie)
            this.user = favoriteCookie;

        TranslationService.changeLanguage(this.user.lang || $window.navigator.language);
    }

    User.prototype.isConnectedResolve = function($stateParams, $state, $promise) {
        return $promise.then(function(datas) {
            return datas;
        }.bind(this), function (error) {
            if (error.status = 401) {
                Notification.error({ message: $filter('translate')('401'), positionY: 'bottom', positionX: 'left' });
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
            TranslationService.changeLanguage(this.user.lang || $window.navigator.language, function () {
                 $cookies.putObject('PersonnalExpense', this.user);
                Notification.info({ message: $filter('translate')('CONNECTED'), positionY: 'bottom', positionX: 'left' });
                $state.go('charts');
            }.bind(this));
        }.bind(this), function (error) {
            Notification.error({ message: $filter('translate')('ERROR')+" :"+error.status + ' - ' + error.data.message, positionY: 'bottom', positionX: 'left' });
        }.bind(this));
    }

    User.prototype.disconnect = function () {
        var params = {
            token: this.user.token,
            user: this.user._id
        };

        this.factory.disconnect({verb: 'disconnect'}, params, function (user) {
            Notification.info({ message: $filter('translate')('DISCONNECTED'), positionY: 'bottom', positionX: 'left' });
            TranslationService.changeLanguage(window.navigator.language, function () {
                $cookies.remove('PersonnalExpense');
                this.user = {
                    token: null,
                    _id: null,
                    firstname: null,
                    lastname: null,
                    username: null,
                    lang: null
                };
                $state.go('user.login');
            }.bind(this));
        }.bind(this), function (error) {
            Notification.error({ message: $filter('translate')('DISCONNECTED')+" : "+error.status + ' - ' + error.data.message, positionY: 'bottom', positionX: 'left' });
        }.bind(this));
    }

    User.prototype.changeLanguage = function () {
      var lang = this.user.lang;
      // todo save en base
      var params = {
          'token': this.user.token,
          'user': this.user._id,
          'lang': lang

      };
      this.factory.changeDefaultLanguage({'verb': 'changeDefaultLanguage'}, params, function (itemCreated) {
          TranslationService.changeLanguage(lang, function () {
            $cookies.putObject('PersonnalExpense', this.user);
            Notification.primary({ message: $filter('translate')('LANGUAGE_CHANGED'), positionY: 'bottom', positionX: 'left' });
            $state.reload()
          }.bind(this));
      }.bind(this), function (error) {
          Notification.error({ message: $filter('translate')('ERROR')+" : "+error.status + ' - ' + error.statusText, positionY: 'bottom', positionX: 'left' });
      }.bind(this));
    }

    return new User();
  });
