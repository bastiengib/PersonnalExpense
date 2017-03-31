function UserFactory($resource, APIURL) {
    return $resource( APIURL + '/users/:id/:verb', {
            verb: '@verb',
            id: '@id'
        },
        {
            'update': {method: 'PUT'},
            'connect': {method: 'POST'},
            'disconnect': {method: 'POST'},
            'checkConnexion' : {method: 'GET'},
            'changeDefaultLanguage': {method: 'POST'}
        }
    );
}

angular.module('user').factory('UserFactory', UserFactory);