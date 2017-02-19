// global variables
var VERSION = "Alpha 0.1"; // not used
angular.module('personnalExpenseApp')
    .constant('APIURL', "http://localhost:7820/api")
    .filter('date', function() {
        return function(input) {
            return moment(input).format(' ddd. DD/MM/YYYY');
        }
    });