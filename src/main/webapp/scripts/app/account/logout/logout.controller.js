'use strict';

angular.module('tnrApp')
    .controller('LogoutController', function (Auth) {
        Auth.logout();
    });
