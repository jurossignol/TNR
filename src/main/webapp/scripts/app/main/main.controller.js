'use strict';

angular.module('tnrApp')
    .controller('MainController', function ($scope, $translate, Auth, Principal) {
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;
        });
        
        $scope.user = {};
        $scope.errors = {};
        $scope.rememberMe = true;
        
        $scope.login = function () {
            Auth.login({
                username: $scope.username,
                password: 'default',
                rememberMe: $scope.rememberMe
            }).then(function () {
                $scope.authenticationError = false;
            }).catch(function () {
                Auth.createAccount({
                    username: $scope.username,
                    password: 'default',
                    rememberMe: $scope.rememberMe,
                    langKey: $translate.use()
                }).then(function () {
                    $scope.authenticationError = false;
                }).catch(function (response) {
                    $scope.authenticationError = true;
                });
            });
        };
    });
