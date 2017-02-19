'use strict';

/**
 * @ngdoc controller
 * @name personnalExpenseApp.controller:Datatable
 * # Datatable controller
 * @description Lead the datatable list
 */
angular.module('datatable')
  .controller('DatatableCtrl', function (DatatableResolve, CategoryResolve) {

    function Datatable() {
      this.data = DatatableResolve;
      this.categories = CategoryResolve;
    }

    Datatable.prototype.getCategory = function(id) {
      var object = _.find(this.categories, function(item){
        return item._id === id;
      });

      return object.name;
    }
    return new Datatable();
  });
