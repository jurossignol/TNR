'use strict';

angular.module('tnrApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('team', {
                parent: 'entity',
                url: '/team',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'tnrApp.team.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/team/teams.html',
                        controller: 'TeamController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('team');
                        return $translate.refresh();
                    }]
                }
            })
            .state('teamDetail', {
                parent: 'entity',
                url: '/team/:id',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'tnrApp.team.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/team/team-detail.html',
                        controller: 'TeamDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('team');
                        return $translate.refresh();
                    }]
                }
            });
    });
