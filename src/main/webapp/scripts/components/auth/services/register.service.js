'use strict';

angular.module('tnrApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


