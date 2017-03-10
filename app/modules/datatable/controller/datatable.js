'use strict';

/**
 * @ngdoc controller
 * @name personnalExpenseApp.controller:Datatable
 * # Datatable controller
 * @description Lead the datatable list
 */
angular.module('datatable')
  .controller('DatatableCtrl', function ($state, $filter, DatatableFactory, ItemManager, DatatableResolve, CategoryResolve, UserService) {

    function Datatable() {
      UserService.resolveReceived = false;
      this.data = DatatableResolve;
      this.categories = CategoryResolve;
      this.factory = DatatableFactory;
      this.data = this.orderBy(this.data, 'date');
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
          title: expense.name,
          message: "<p>"+expense.amount+"</p><p>"+$filter('date')(expense.date)+"</p><p>"+this.getCategory(expense.category)+"</p>",
          size: 'small',
          buttons: {
              confirm: {
                  label: '<i class="fa fa-ban"></i>',
                  className: 'btn-outline-danger pull-right'
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
