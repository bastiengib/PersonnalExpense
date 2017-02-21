'use strict';

/**
 * @ngdoc controller
 * @name personnalExpenseApp.controller:DatatableForm
 * # DatatableForm controller
 * @description Lead the datatable list
 */
angular.module('datatable')
  .controller('DatatableFormCtrl', function (DatatableFactory, ItemManager, CategoryResolve, FormResolve) {


    function DatatableForm() {
      this.categories = CategoryResolve;
      this.data = FormResolve;
      this.factory = DatatableFactory;
      if (!this.data) {
        this.data = {};
        this.data.date = moment().format("YYYY-MM-DD");
      }      
    }

    DatatableForm.prototype = Object.create(ItemManager.__proto__);
    DatatableForm.constructor = DatatableForm;

    return new DatatableForm();
  });
