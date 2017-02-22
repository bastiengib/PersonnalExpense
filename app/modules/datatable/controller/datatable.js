'use strict';

/**
 * @ngdoc controller
 * @name personnalExpenseApp.controller:Datatable
 * # Datatable controller
 * @description Lead the datatable list
 */
angular.module('datatable')
  .controller('DatatableCtrl', function ($filter, DatatableFactory, ItemManager, DatatableResolve, CategoryResolve) {

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

    Datatable.prototype.modal = function($id) {
      var expense = _.find(this.data, function(obj) {
        return obj._id === $id;
      });

      bootbox.alert({
          title: expense.name,
          message: "<p>"+expense.amount+"</p><p>"+$filter('date')(expense.date)+"</p><p>"+this.getCategory(expense.category)+"</p>",
          size: 'large'
      });
    }

    return new Datatable();
  });
