function TemplateFactory($resource, APIURL) {
    return $resource( APIURL + '/templates/:id/:verb', {
            verb: '@verb',
            id: '@id'
        },
        {
            'getAll': {method: 'GET', isArray:true},
            'update': {method: 'PUT'}
        }
    );
}

angular.module('template').factory('TemplateFactory', TemplateFactory);