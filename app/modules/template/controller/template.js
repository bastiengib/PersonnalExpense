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
      var template = _.find(this.data, function(obj) {
        return obj._id === $id;
      });

      bootbox.confirm({
          title: $filter('translate')('DETAILS'),
          message: '<strong class="col-4">'+$filter('translate')('NAME')+' : </strong><div class="pull-right">'+template.name+'</div><hr />'+
            '<strong class="col-4">'+$filter('translate')('AMOUNT')+' : </strong><div class="pull-right">'+$filter('amount')(template.amount)+' €</div><hr />'+
            '<strong class="col-4">'+$filter('translate')('CATEGORY')+' : </strong><div class="pull-right">'+this.getCategory(template.category)+'</div>',
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
        name: expense.name,
        amount: expense.amount,
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
            Notification.primary({ message: $filter('translate')('TAPPLIED', this.lang), positionY: 'bottom', positionX: 'left' });
            this.apply = null;
        }.bind(this), function (error) {
            Notification.error({ message: $filter('translate')('ERROR', this.lang)+" : "+error.status + ' - ' + error.statusText, positionY: 'bottom', positionX: 'left' });
        }.bind(this));
    }

    Template.prototype.update = function($event, $id) {
      $event.stopPropagation();
      $state.go('template.update', {id: $id});
    }

    return new Template();
  });
