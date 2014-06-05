'use strict';

angular.module('attentiaPronostiekApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
        }).when('/home', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        }).when('/mijnpronostiek', {
            templateUrl: 'views/userpronostiek.html',
            controller: 'PronostiekCtrl'
        }).when('/logout', {
            templateUrl: 'views/logout.html',
            controller: 'MainCtrl'
        }).otherwise({
        redirectTo: '/404.html'
      });
  });
