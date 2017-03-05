'use strict';

/**
 * @ngdoc controller
 * @name personnalExpenseApp.controller:TemplateForm
 * # TemplateForm controller
 * @description Lead the template list
 */
angular.module('template')
  .controller('TemplateFormCtrl', function (TemplateFactory, ItemManager, CategoryResolve, FormResolve, AMOUNT) {


    function TemplateForm() {
      this.categories = CategoryResolve;
      this.data = FormResolve;
      this.factory = TemplateFactory;
      this.AMOUNT = AMOUNT;

      if (!this.data) {
        this.data = {};
        this.data.date = new Date();
      }      
    }

    TemplateForm.prototype = Object.create(ItemManager.__proto__);
    TemplateForm.constructor = TemplateForm;

    return new TemplateForm();
  });
