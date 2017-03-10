function ChartsFactory($resource, APIURL) {
    return $resource( APIURL + '/charts/:verb', {
            verb: '@verb'
        },
        {
            'getCharts': {method: 'GET', isArray:true}
        }
    );
}

angular.module('charts').factory('ChartsFactory', ChartsFactory);