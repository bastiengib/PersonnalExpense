'use strict';

/**
 * @ngdoc controller
 * @name personnalExpenseApp.controller:Template
 * # Template controller
 * @description Lead the template list
 */
angular.module('template')
  .controller('TemplateCtrl', function ($state, $filter, TemplateFactory, ItemManager, TemplateResolve, CategoryResolve, Notification, UserService) {

    function Template() {
      this.data = TemplateResolve;
      this.categories = CategoryResolve;
      this.factory = TemplateFactory;
      this.apply = null;
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
                this.delete(this.factory, $id, 'template.list', true);
              }
          }.bind(this)
      }).bind(this);
    }

    Template.prototype.use = function($event, $id) {
      $event.stopPropagation();
      var expense = _.find(this.data, function(obj) {
        return obj._id === $id;
      });

      this.apply = {
        id: $id,
        date: new Date()
      };
    }

    Template.prototype.closeUse = function() {
      this.apply = null;
    }

    Template.prototype.generate = function() {
        var params = {
            'token': UserService.user.token,
            'user': UserService.user._id,
            'verb': 'apply'
        };
        TemplateFactory.apply(params, this.apply, function (itemCreated) {
            Notification.success({ message: 'the template was succesfully applied :)', title: 'Success' });
            this.apply = null;
        }.bind(this), function (error) {
            Notification.error({ message: error.status + ' - ' + error.statusText, title: 'Error (' + error.status + ')' });
        }.bind(this));
    }

    Template.prototype.update = function($event, $id) {
      $event.stopPropagation();
      $state.go('template.update', {id: $id});
    }

    return new Template();
  });
