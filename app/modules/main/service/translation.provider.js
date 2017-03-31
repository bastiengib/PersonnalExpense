'use strict';

/**
 * @ngdoc controller
 * @name personnalExpenseApp.Provider:translation
 * # translate
 * @description Lead the trnaslation wiki
 */
angular.module('TranslateModule')
  .provider('$translationProvider', function () {

    this.$get = function () {
        return {
            translate: {
                "DAY": {
                    "Monday": "Monday",
                    "Mon":"Mon",
                    "Tuesday": "Tuesday",
                    "Tue": "Tue",
                    "Wednesday": "Wednesday",
                    "Wed": "Wed",
                    "Thurday": "Thurday",
                    "Thu": "Thu",
                    "Friday": "Friday",
                    "Fri": "Fri",
                    "Saturday": "Saturday",
                    "Sat": "Sat",
                    "Sunday": "Sunday",
                    "Sun": "Sun"
                },
                "MONTH": {
                    "January": "January",
                    "February": "February",
                    "March": "March",
                    "April": "April",
                    "May": "May",
                    "June": "June",
                    "July": "July",
                    "August": "August",
                    "September": "September",
                    "October": "October",
                    "November": "November",
                    "December": "December"
                },
                "DETAILS": "Details",
                "OF": "of",
                "LIST_OF_EXPENSES": "List of expenses",
                "LIST_OF_TEMPLATES": "List of templates",
                "LIST_OF_CATEGORIES": "List of categories",
                "CLOSE": "Close",
                "HELLO": "Hello",
                "DATATABLES": "Expenses",
                "TEMPLATES": "Templates",
                "CATEGORIES": "Categories",
                "ACCOUNT": "Account",
                "DISCONNECT": "Disconnect",
                "DESCRIPTION": "Manage your bank account ...",
                "TRY_IT": "Try it!",
                "USERNAME": "Username",
                "PASSWORD": "Password",
                "CONNECTION": "Let's go!",
                "CREATE_ACCOUNT": "Create an account",
                "FIRSTNAME": "First name",
                "LASTNAME": "Last name",
                "CREATE": "Create",
                "UPDATE": "Update",
                "BACK_TO_LOGIN": "Back to login",
                "BACK_TO_CHARTS": "Back to charts",
                "CHARTS": "Charts",
                "DATATABLE": "Expense",
                "CREATE_DATATABLE": "Create an expense",
                "UPDATE_DATATABLE": "Update the expense",
                "CREATE_TEMPLATE": "Create a template",
                "UPDATE_TEMPLATE": "Update the template",
                "TEMPLATE": "Template",
                "NAME": "Name",
                "AMOUNT": "Amount",
                "DATE": "Date",
                "CATEGORY": "Category",
                "ACTION": "Action",
                "COLOR": "Color",
                "SAVED": "The item was succesfully saved :)",
                "UPDATED": "The item was succesfully updated :)",
                "DELETED": "The item was succesfully deleted :)",
                "ERROR": "Oh oh ':(",
                "TAPPLIED": "The template was succesfully applied",
                "DISCONNECTED": "Disconnected, bye bye :'(",
                "CONNECTED": "Connected, bonjour :)",
                "401": "Who are you (-_-) ?",
                "CHANGE_LANGUAGE" : "Change the language",
                "LANGUAGE_CHANGED": "The language was succesfully  updated :)"
            }
        }
    }
  });
