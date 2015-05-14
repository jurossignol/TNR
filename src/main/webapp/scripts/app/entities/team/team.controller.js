'use strict';

angular.module('tnrApp')
    .controller('TeamController', function ($scope, Team) {
        $scope.teams = [];
        $scope.loadAll = function() {
            Team.query(function(result) {
               $scope.teams = result;
            });
        };
        $scope.loadAll();

        $scope.create = function () {
            Team.update($scope.team,
                function () {
                    $scope.loadAll();
                    $('#saveTeamModal').modal('hide');
                    $scope.clear();
                });
        };

        $scope.update = function (id) {
            Team.get({id: id}, function(result) {
                $scope.team = result;
                $('#saveTeamModal').modal('show');
            });
        };

        $scope.delete = function (id) {
            Team.get({id: id}, function(result) {
                $scope.team = result;
                $('#deleteTeamConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Team.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteTeamConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.clear = function () {
            $scope.team = {name: null, id: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();
        };
    });
