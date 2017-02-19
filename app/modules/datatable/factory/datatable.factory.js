function DatatableFactory($resource, APIURL) {
    return $resource( APIURL + '/expenses/:id/:verb', {
            verb: '@verb',
            id: '@id'
        },
        {
            'getAll': {method: 'GET', isArray:true},
            'update': {method: 'PUT'}
        }
    );
}

angular.module('datatable').factory('DatatableFactory', DatatableFactory);