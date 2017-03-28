'use strict';

/**
 * @ngdoc service
 * @name personnalExpenseApp.service:Charts
 * # Charts service
 * @description Lead the user charts params
 */
angular.module('datatable')
  .service('ChartsService', function ($state) {

    function Service() {
        this.verb = "permonth";
        this.month = moment().month();
        this.year = moment().year();
    }

    Service.prototype.inc = function ($i) {
        this.month += $i;
        if (this.month === -1) {
            this.month = 12;
            this.year -= 1;
        } else if (this.month === 12) {
            this.month = 1;
            this.year += 1;
        }
    }

    Service.prototype.displayByMonth = function () {
      return moment().year(this.year).month(this.month).format("MMMM, YYYY");
    }

    return new Service();
  });
