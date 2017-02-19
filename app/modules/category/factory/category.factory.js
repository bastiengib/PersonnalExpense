function CategoryFactory($resource, APIURL) {
    return $resource( APIURL + '/categories/:id/:verb', {
            verb: '@verb',
            id: '@id'
        },
        {
            'getAll': {method: 'GET', isArray:true},
            'update': {method: 'PUT'}
        }
    );
}

angular.module('category').factory('CategoryFactory', CategoryFactory);