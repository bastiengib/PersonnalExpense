// global variables
var VERSION = "Alpha 0.1"; // not used
angular.module('personnalExpenseApp')
    .constant('APIURL', "http://localhost:7821/api")
    .constant('AMOUNT', '^\\$?(([1-9](\\d*|\\d{0,2}(,\\d{3})*))|0)(\\.\\d{1,2})?$')
    .filter('date', function() {
        return function(input) {
            return moment(input).format('DD/MM/YYYY');
        }
    })
    .filter('amount', function() {
        return function(input) {
            return (input).toFixed(2);
        }
    })
    .filter('numberFixedLen', function () {
        return function (n, len) {
            var num = parseInt(n, 10);
            len = parseInt(len, 10);
            if (isNaN(num) || isNaN(len)) {
                return n;
            }
            num = ''+num;
            while (num.length < len) {
                num = '0'+num;
            }
            return num;
        };
    });

$(document).on('click',function(e) {
    if ($( "#navbarNav" ).hasClass( 'show' )) {
        $('#navbarNav').collapse('hide');
    }
});