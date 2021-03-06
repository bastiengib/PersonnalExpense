angular.module("a1b4Datepicker")
    .directive('testDatepicker', function() {
        return {
            restrict: 'E',
            scope: {
                source:'=',
                lang:'='
            },
            templateUrl: "directives/angular-boostrap4-datepicker/datepicker.html",
            controller: 'a1b4DatepickerCtrl',
            controllerAs: 'ctrl'
        }
    })
    .filter('dateheader', function() {
        return function(input) {
            return moment(input).format('YYYY, MMMM');
        }
    });