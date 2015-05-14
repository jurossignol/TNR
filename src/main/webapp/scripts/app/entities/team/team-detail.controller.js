'use strict';

angular.module('tnrApp')
    .controller('TeamDetailController', function ($scope, $stateParams, Team) {
        $scope.team = {};
        $scope.load = function (id) {
            Team.get({id: id}, function(result) {
              $scope.team = result;
            });
        };
        $scope.load($stateParams.id);
    });
