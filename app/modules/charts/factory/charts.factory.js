function ChartsFactory($resource, APIURL) {
    return $resource( APIURL + '/chart/:verb', {
            verb: '@verb'
        },
        {
            'getCharts': {method: 'GET', isArray:true}
        }
    );
}

angular.module('charts').factory('ChartsFactory', ChartsFactory);