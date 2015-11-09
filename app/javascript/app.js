'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
        'ngRoute',
        'version'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/view1', {
                templateUrl: 'templates/view1/index.html',
                controller: 'View1Ctrl'
            })

        .otherwise({
            redirectTo: '/view1'
        });

    }]);
