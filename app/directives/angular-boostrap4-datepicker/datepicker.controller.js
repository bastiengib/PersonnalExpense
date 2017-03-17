'use strict';

/**
 * @ngdoc controller
 * @name controller:angular-bootstrap4-datepicker
 * # the directive's controller
 * @description Lead the directive
 */
angular.module('a1b4Datepicker')
  .controller('a1b4DatepickerCtrl', function ($scope) {

    function Datepicker() {
        this.table = [];
    }

    Datepicker.prototype.reload = function () {
        this.table = [];
        this.init(moment($scope.source));
    }

    Datepicker.prototype.init = function(day) {
        // 1st day of month -> get first sunday, to get full first week
        var start = moment().year(day.year()).month(day.month()).date(1).isoWeekday(0);
        var cursor = start;

        while(cursor.diff(moment($scope.source).endOf('month')) <= 0) {
            var week = [];
            for (var i = 0; i < 7; i++) {
                var item = {
                    data: moment(cursor),
                    display: cursor.date(),
                    month: cursor.month(),
                    dayOfWeek: cursor.isoWeekday()
                };
                week.push(item);
                cursor.add(1, 'd');
            }
            this.table.push(week);
        }
    }

    Datepicker.prototype.set = function(date) {
        $scope.source = new Date(date.format("YYYY-MM-DD"));
    }

    Datepicker.prototype.isTheDate = function(day) {
        var compare = moment($scope.source).startOf('day');
        return compare.diff(day.startOf('day')) === 0;
    }

    Datepicker.prototype.isTheMonth = function(day) {
        var ref = moment($scope.source).year()+""+moment($scope.source).month();
        var oth = moment(day).year()+""+moment(day).month();
        return ref === oth;
    }

    return new Datepicker();
  });
