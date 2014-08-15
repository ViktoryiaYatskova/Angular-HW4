'use strict';

var app = angular.module('angularTrainingApp', ['directives', 'services', 'ngResource', 'ngRoute'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/addPost', {
                controller: NewPostCtrl
            }).
            when('/editPost/:id', {
                controller: EditPostCtrl
            }).
            when('/index', {
                templateUrl: '/index.html'
            }).
            when('/Latest', {
                templateUrl: '/index.html'
            }).
            otherwise({
                redirectTo: '/index'
            });
        $locationProvider.html5Mode(true);
    }]);