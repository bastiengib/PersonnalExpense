'use strict';

/**
 * @ngdoc controller
 * @name personnalExpenseApp.controller:Datatable
 * # Datatable controller
 * @description Lead the datatable list
 */
angular.module('datatable')
  .controller('DatatableCtrl', function ($state, $filter, DatatableFactory, ItemManager, DatatableResolve, CategoryResolve, DatatableService) {

    function Datatable() {
      this.data = DatatableResolve.expenses;
      this.categories = CategoryResolve;
      this.factory = DatatableFactory;
      this.data = this.data;
      this.service = DatatableService;
      this.service.count = DatatableResolve.count;
    }

    Datatable.prototype = Object.create(ItemManager.__proto__);
    Datatable.constructor = Datatable;

    Datatable.prototype.orderBy = function (table, $key) {
      var ret = []
      if ($key === 'date')
        ret = _.sortBy(table, function (obj) {
          return obj.date;
        });
      return ret
    }

    Datatable.prototype.getCategory = function(id) {
      var object = _.find(this.categories, function(item){
        return item._id === id;
      });

      return object.name;
    }

    Datatable.prototype.getCategoryColor = function(id) {
      var object = _.find(this.categories, function(item){
        return item._id === id;
      });

      return object.color;
    }

    Datatable.prototype.modal = function($id) {
      var expense = _.find(this.data, function(obj) {
        return obj._id === $id;
      });

      bootbox.confirm({
          title: $filter('translate')('DETAILS'),
          message: '<strong class="col-4">'+$filter('translate')('NAME')+' : </strong><div class="pull-right">'+expense.name+'</div><hr />'+
            '<strong class="col-4">'+$filter('translate')('AMOUNT')+' : </strong><div class="pull-right">'+$filter('amount')(expense.amount)+' €</div><hr />'+
            '<strong class="col-4">'+$filter('translate')('DATE')+' : </strong><div class="pull-right">'+$filter('date')(expense.date)+'</div><hr />'+
            '<strong class="col-4">'+$filter('translate')('CATEGORY')+' : </strong><div class="pull-right">'+this.getCategory(expense.category)+'</div>',
          size: 'medium',
          buttons: {
              confirm: {
                  label: '<i class="fa fa-ban"></i>',
                  className: 'btn-outline-secondary pull-right'
              },
              cancel: {
                  label: '<i class="fa fa-close"></i>',
                  className: 'btn-outline-info pull-right'
              }
          },
          callback: function (result) {
              if (result) {
                this.delete(this.factory, $id, 'datatable.list', true);
              }
          }.bind(this)
      }).bind(this);
    }

    Datatable.prototype.update = function($event, $id) {
      $event.stopPropagation();
      $state.go('datatable.update', {id: $id});
    }

    return new Datatable();
  });
