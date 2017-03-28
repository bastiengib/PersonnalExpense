'use strict';

/**
 * @ngdoc controller
 * @name personnalExpenseApp.controller:Charts
 * # Charts controller
 * @description Lead the charts
 */
angular.module('charts')
  .controller('ChartsCtrl', function ($scope, ItemManager, ChartsResolve, ChartsFactory, ChartsService, CategoryResolve, UserService) {

    function Charts() {
      this.service = ChartsService;
      this.factory = ChartsFactory;
      this.categories = _.sortBy(CategoryResolve, function(obj) {
        return obj._id;
      });
      this.load(ChartsResolve);
      $scope.labels2 = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
      $scope.series2 = ['Series A', 'Series B'];

      $scope.data2 = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
      ];
    }

    Charts.prototype.load = function ($resolve) {
      if ($resolve.length > 0) {
        this.data = _.sortBy($resolve, function (obj){
          return obj._id.category;
        });
        this.labels = _.map(this.categories, function(obj) {
          return obj.name;
        });
        //$scope.data = [300, 500, 100];
        this.data =  _.map(this.data, function(obj) {
          return obj.sum;
        });
      } else {
        this.data = [1];
        this.labels = ["No expense"];
      }
    }

    Charts.prototype.inc = function ($i) {
        this.service.inc($i);
        var params = {
            'token': UserService.user.token,
            'user': UserService.user._id,
            'verb': this.service.verb,
            'y': this.service.year,
            'm': this.service.month + 1
        };
        
        this.factory.getCharts(params,function (result) {
          this.load(result);
        }.bind(this));
    }

    return new Charts();
  });
