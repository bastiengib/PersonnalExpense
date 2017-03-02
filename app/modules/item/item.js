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
    
    ItemManager.prototype.create = function (factory, item, redirectLocation, reload) {
        var valid = true;
        var _this = this;
        if (valid) {
            this.factory.save({}, item, function (itemCreated) {
                if (reload) {
                    _this.data.push(itemCreated.item);
                }
                Notification.success({ message: 'the item was succesfully saved :)', title: 'Success' });
                if (redirectLocation)
                    $state.go(redirectLocation);
            }.bind(this), function (error) {
                Notification.error({ message: error.status + ' - ' + error.data.message, title: 'Error (' + error.status + ')' });
            }.bind(this));
        }
    };

    ItemManager.prototype.update = function (factory, item, redirectLocation) {
        var valid = true;
        if (valid) {  
            this.factory.update({ id: item._id }, item, function (item) {
                Notification.success({ message: 'the item was succesfully updated :)', title: 'Success' });
                if (redirectLocation)
                    $state.go(redirectLocation);
            }.bind(this), function (error) {
                Notification.error({ message: error.status + ' - ' + error.data.message, title: 'Error (' + error.status + ')' });
            }.bind(this));
        }
    };

    ItemManager.prototype.delete = function (factory, itemID, redirectLocation, reload) {
        var _this = this;
        var _itemID = itemID;
        bootbox.confirm("Are you sure that you want to delete this item?", function (result) {
            if (result) {
                _this.factory.delete({ id: _itemID }, {}, function (rejected) {
                    if (reload) {
                        _this.data = _.reject(_this.data, function (obj) {
                            return obj._id === itemID;
                        });
                    }
                    Notification.warning({ message: 'the item was succesfully deleted :)', title: 'Success' });
                    if (redirectLocation)
                        $state.go(redirectLocation);
                }.bind(this), function (error) {
                    Notification.error({ message: error.status + ' - ' + error.data.message, title: 'Error (' + error.status + ')' });
                }.bind(this));
            }
        });
    };

    ItemManager.prototype.isObject = function(obj) {
        return _.isObject(obj);
    }

    return new ItemManager();
  });