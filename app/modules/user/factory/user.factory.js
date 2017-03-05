function UserFactory($resource, APIURL) {
    return $resource( APIURL + '/users/:id/:verb', {
            verb: '@verb',
            id: '@id'
        },
        {
            'update': {method: 'PUT'},
            'connect': {method: 'POST'},
            'disconnect': {method: 'POST'},
            'checkConnexion' : {method: 'GET'}

        }
    );
}

angular.module('user').factory('UserFactory', UserFactory);