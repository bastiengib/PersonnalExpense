'use strict';

/**
 * @ngdoc controller
 * @name personnalExpenseApp.controller:User
 * # User controller
 * @description Lead the user list
 */
angular.module('TranslateModule')
  .service('TranslationService', function ($http, $window, $filter, $cookies) {

    function Service() {
        this.lang = null;
        this.menu= {
            datatable : "",
            templates : "",
            categories : "",
            account: "",
            disconnect: "",
            hello: ""
        };
        this.getListOfLang();
    }

    // a utiliser dans le app.config. sinon les filtres n'auront 
    // pas les données pour travailler au premier chazrgement (F5)
    // en forçant le loading, on est sur d'avoir les données avant d'appliquer les filtres
    Service.prototype.init = function () {
        var lang = $window.navigator.language;
        // on vérifie si l'utilisateur n'a pas déja un cookies
        var cookie = $cookies.getObject('PersonnalExpense');        
        if (cookie && cookie.lang)
            lang = cookie.lang;

        this.changeLanguage(lang);
    }

    Service.prototype.changeLanguage = function ($lang, callback) {
        this.lang = $lang;
        // language
        if (this.lang) {
            $http.get('./assets/json/'+$lang+'.json')
            .then(function(res){
                this.translate = res.data;                
                this.loadMenu();
                if (callback)
                    callback();
                    
            }.bind(this));
        }
    }

    Service.prototype.getListOfLang = function () {
        $http.get('./assets/json/language.json')
        .then(function(res){
            this.languages = res.data;                
            this.loadMenu();
        }.bind(this));
    }

    Service.prototype.convert = function ($code) {
        return $filter('translate')($code);
    }

    Service.prototype.loadMenu = function () {
        this.menu.hello = $filter('translate')('HELLO');
        this.menu.datatable = $filter('translate')('DATATABLE');
        this.menu.templates = $filter('translate')('TEMPLATES');
        this.menu.categories = $filter('translate')('CATEGORIES');
        this.menu.account = $filter('translate')('ACCOUNT');
        this.menu.disconnect = $filter('translate')('DISCONNECT');
    }

    return new Service();
  }).filter('translate', function(TranslationService, $translationProvider) {
      return function(name) {
          if (!TranslationService.translate || !TranslationService.translate[name]) {
            return $translationProvider.translate[name];
          } else {
            return TranslationService.translate[name];
          }
      }
  }).filter('translateMonth', function(TranslationService) {
      return function(input) {
          var months = TranslationService.translate['MONTH'];
          var res = input;
          res = res.replace('January', months.January);
          res = res.replace('February', months.February);
          res = res.replace('March', months.March);
          res = res.replace('April', months.April);
          res = res.replace('May', months.May);
          res = res.replace('June', months.June);
          res = res.replace('July', months.July);
          res = res.replace('August', months.August);
          res = res.replace('September', months.September);
          res = res.replace('October', months.October);
          res = res.replace('November', months.November);
          res = res.replace('December', months.December);
          return res;
      }
  }).filter('translateDay', function(TranslationService) {
      return function(input) {
          var days = TranslationService.translate['DAY'];
          var res = input;
          res = res.replace('Monday', days.Monday);
          res = res.replace('Tuesday', days.Tuesday);
          res = res.replace('Wednesday', days.Wednesday);
          res = res.replace('Thursday', days.Thursday);
          res = res.replace('Friday', days.Friday);
          res = res.replace('Saturday', days.Saturday);
          res = res.replace('Sunday', days.Sunday);
          res = res.replace('Mon', days.Mon);
          res = res.replace('Tue', days.Tue);
          res = res.replace('Wed', days.Wed);
          res = res.replace('Thu', days.Thu);
          res = res.replace('Fri', days.Fri);
          res = res.replace('Sat', days.Sat);
          res = res.replace('Sun', days.Sun);
          return res;
      }
  });
