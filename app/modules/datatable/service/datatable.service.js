'use strict';

/**
 * @ngdoc service
 * @name personnalExpenseApp.service:Datatable
 * # User controller
 * @description Lead the user list
 */
angular.module('datatable')
  .service('DatatableService', function ($state) {

    function Service() {
        this.page = 0;
        this.limit = 10;
        this.sort = -1;
        this.count = 0;
    }

    Service.prototype.getNbOfPages = function () {
        var euclidean = this.count / this.limit;
        var rest = this.count % this.limit;
         rest > 0 ? euclidean += 1 : null;
        return euclidean;
    }

    Service.prototype.isTheLimit = function ($limit) {
      return this.limit === $limit;
    }

    Service.prototype.changeLimit = function ($limit) {
      this.limit = $limit;
      $state.reload();
    }

    Service.prototype.incPage = function($i) {
      if (this.page + 1 + $i > 0 && this.page + 1 + $i <= this.getNbOfPages()) {
        this.page += $i;
        $state.reload();
      }
    }

    Service.prototype.setPage = function($i) {
      this.page = $i;
      $state.reload();
    }

    Service.prototype.isTheLastPage = function () {
      return this.page + 1 === this.getNbOfPages();
    }

    Service.prototype.isTheFirstPage = function () {
      return this.page === 0;
    }

    return new Service();
  });
