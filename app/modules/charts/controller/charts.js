'use strict';

/**
 * @ngdoc controller
 * @name personnalExpenseApp.controller:Charts
 * # Charts controller
 * @description Lead the charts
 */
angular.module('charts')
  .controller('ChartsCtrl', function (ItemManager, ChartsResolve, ChartsFactory) {

    function Charts() {
      //this.data = ChartsResolve;
      this.data = {test:{labels: [], data: []}};
      this.data.test.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
      this.data.test.data = [300, 500, 100];
      this.factory = ChartsFactory;
    }

    return new Charts();
  });
