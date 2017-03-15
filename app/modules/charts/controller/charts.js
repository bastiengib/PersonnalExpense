'use strict';

/**
 * @ngdoc controller
 * @name personnalExpenseApp.controller:Charts
 * # Charts controller
 * @description Lead the charts
 */
angular.module('charts')
  .controller('ChartsCtrl', function ($scope, ItemManager, ChartsResolve, ChartsFactory) {

    function Charts() {
      //this.data = ChartsResolve;
      $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
      $scope.data = [300, 500, 100];
      $scope.labels2 = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
      $scope.series2 = ['Series A', 'Series B'];

      $scope.data2 = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
      ];
      this.factory = ChartsFactory;
    }

    return new Charts();
  });
