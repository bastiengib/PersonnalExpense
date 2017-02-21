'use strict';

/**
 * @ngdoc controller
 * @name personnalExpenseApp.controller:Datatable
 * # Datatable controller
 * @description Lead the datatable list
 */
angular.module('datatable')
  .controller('DatatableCtrl', function (DatatableFactory, ItemManager, DatatableResolve, CategoryResolve) {

    function Datatable() {
      this.data = DatatableResolve;
      this.categories = CategoryResolve;
      this.factory = DatatableFactory;
    }

    Datatable.prototype = Object.create(ItemManager.__proto__);
    Datatable.constructor = Datatable;

    Datatable.prototype.getCategory = function(id) {
      var object = _.find(this.categories, function(item){
        return item._id === id;
      });

      return object.name;
    }
    return new Datatable();
  });
