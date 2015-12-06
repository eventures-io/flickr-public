'use strict';

angular.module('potatoApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ui.router'
    ])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider
            .otherwise('/');

        $stateProvider
            .state('main', {
                url: '/:tag',
                templateUrl: 'app/main/main.html',
                controller: 'MainController'
            })
            .state('detail', {
                url: '/detail/:pictureId',
                templateUrl: 'app/detail/detail.html',
                controller: 'DetailController'
            });
        $locationProvider.html5Mode(true);
    })
    .filter('HtmlFilter', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]);