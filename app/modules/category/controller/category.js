'use strict';

/**
 * @ngdoc controller
 * @name personnalExpenseApp.controller:Category
 * # Category controller
 * @description Lead the category list
 */
angular.module('category')
  .controller('CategoryCtrl', function (ItemManager, CategoryResolve, CategoryFactory) {

    function Category() {
      this.data = CategoryResolve;
      this.factory = CategoryFactory;
      console.log(this.data);
    }

    Category.prototype = Object.create(ItemManager.__proto__);
    Category.constructor = Category;

    return new Category();
  });
