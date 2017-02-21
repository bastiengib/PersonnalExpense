'use strict';

/**
 * @ngdoc controller
 * @name personnalExpenseApp.controller:ItemManager
 * # ItemManager controller
 * @description Lead CRUD function
 */
angular.module('item')
  .factory('ItemManager', function (Notification, $state) {

    function ItemManager () {

    }
    
    ItemManager.prototype.create = function (factory, item, redirectLocation) {
        var valid = true;
        if (valid) {
            this.factory.save({}, item, function (itemCreated) {
                Notification.success({ message: 'the item was succesfully saved :)', title: 'Success' });
            $state.go(redirectLocation);
            }.bind(this), function (error) {
                this.init(error);
                Notification.error({ message: error.status + ' - ' + error.statusText, title: 'Error (' + error.status + ')' });
            }.bind(this));
        }
    };

    ItemManager.prototype.update = function (factory, item, redirectLocation) {
        var valid = true;
        if (valid) {  
            this.factory.update({ id: itemID }, item, function (item) {
                Notification.success({ message: 'the item was succesfully updated :)', title: 'Success' });
                if (redirectLocation)
                    $state.go(redirectLocation);
            }.bind(this), function (error) {
                this.init(error);
                Notification.error({ message: error.status + ' - ' + error.statusText, title: 'Error (' + error.status + ')' });
            }.bind(this));
        }
    };

    ItemManager.prototype.delete = function (factory, itemID, redirectLocation) {
        var _this = this;
        var _itemID = itemID;
        bootbox.confirm("Are you sure that you want to delete this item?", function (result) {
            if (result) {
                _this.factory.delete({ id: _itemID }, {}, function () {
                    _this.init();
                    Notification.warning({ message: 'the item was succesfully deleted :)', title: 'Success' });
                    if (redirectLocation)
                        $state.go(redirectLocation);
                }.bind(_this), function (error) {
                    _this.init(error);
                    Notification.error({ message: error.status + ' - ' + error.statusText, title: 'Error (' + error.status + ')' });
                }.bind(_this));
            }
        });
    };

    ItemManager.prototype.isObject = function(obj) {
        return _.isObject(obj);
    }

    return new ItemManager();
  });