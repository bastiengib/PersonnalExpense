// global variables
var VERSION = "Alpha 0.1"; // not used
angular.module('personnalExpenseApp')
    .constant('APIURL', "http://localhost:7821/api")
    .filter('date', function() {
        return function(input) {
            return moment(input).format('DD/MM/YYYY');
        }
    })
    .filter('amount', function() {
        return function(input) {
            return (input).toFixed(2);
        }
    });