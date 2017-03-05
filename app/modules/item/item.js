'use strict';

/**
 * @ngdoc controller
 * @name personnalExpenseApp.controller:ItemManager
 * # ItemManager controller
 * @description Lead CRUD function
 */
angular.module('item')
  .factory('ItemManager', function (Notification, $state, UserService) {

    function ItemManager () {

    }
    
    ItemManager.prototype.create = function (factory, item, redirectLocation, reload) {
        var _this = this;
        var params = {
            'token': UserService.user.token,
            'user': UserService.user.pseudo
        };
        this.factory.save(params, item, function (itemCreated) {
            if (reload) {
                _this.data.push(itemCreated.item);
            }
            Notification.success({ message: 'the item was succesfully saved :)', title: 'Success' });
            if (redirectLocation)
                $state.go(redirectLocation);
        }.bind(this), function (error) {
            Notification.error({ message: error.status + ' - ' + error.data.message, title: 'Error (' + error.status + ')' });
            if (error.status = 401) {
                return $q.reject({ authenticated: false });
            }
        }.bind(this));
    };

    ItemManager.prototype.update = function (factory, item, redirectLocation) {
        var params = {
            'token': UserService.user.token,
            'user': UserService.user._id,
            'id': item._id
        };
        this.factory.update(params, item, function (item) {
            Notification.success({ message: 'the item was succesfully updated :)', title: 'Success' });
            if (redirectLocation)
                $state.go(redirectLocation);
        }.bind(this), function (error) {
            Notification.error({ message: error.status + ' - ' + error.data.message, title: 'Error (' + error.status + ')' });
            if (error.status = 401) {
                return $q.reject({ authenticated: false });
            }
        }.bind(this));
    };

    ItemManager.prototype.delete = function (factory, itemID, redirectLocation, reload) {
        var _this = this;
        var params = {
            'token': UserService.user.token,
            'user': UserService.user._id,
            'id': itemID
        };
        bootbox.confirm("Are you sure that you want to delete this item?", function (result) {
            if (result) {
                _this.factory.delete(params, {}, function (rejected) {
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
                    if (error.status = 401) {
                        return $q.reject({ authenticated: false });
                    }
                }.bind(this));
            }
        });
    };

    ItemManager.prototype.isObject = function(obj) {
        return _.isObject(obj);
    }

    return new ItemManager();
  });