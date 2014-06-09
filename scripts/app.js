'use strict';

angular.module('attentiaPronostiekApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
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
            controller: 'LogoutCtrl'
        }).when('/resultaten', {
            templateUrl: 'views/resultaten.html',
            controller: 'ResultatenCtrl'
        }).otherwise({
        redirectTo: '/views/main.html'
      });
});

