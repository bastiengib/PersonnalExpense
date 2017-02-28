'use strict';

/**
 * @ngdoc controller
 * @name personnalExpenseApp.controller:Template
 * # Template controller
 * @description Lead the template list
 */
angular.module('template')
  .controller('TemplateCtrl', function ($state, $filter, TemplateFactory, ItemManager, TemplateResolve, CategoryResolve) {

    function Template() {
      this.data = TemplateResolve;
      this.categories = CategoryResolve;
      this.factory = TemplateFactory;
    }

    Template.prototype = Object.create(ItemManager.__proto__);
    Template.constructor = Template;

    Template.prototype.getCategory = function(id) {
      var object = _.find(this.categories, function(item){
        return item._id === id;
      });

      return object.name;
    }

    Template.prototype.getCategoryColor = function(id) {
      var object = _.find(this.categories, function(item){
        return item._id === id;
      });

      return object.color;
    }

    Template.prototype.modal = function($id) {
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
                this.delete(this.factory, $id, 'template.list');
              }
          }.bind(this)
      }).bind(this);
    }

    return new Template();
  });
