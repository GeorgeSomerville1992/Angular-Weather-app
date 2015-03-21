'use strict';

/**
 * @ngdoc overview
 * @name fourcastIoAngularAppApp
 * @description
 * # fourcastIoAngularAppApp
 *
 * Main module of the application.
 */
angular
  .module('fourcastIoAngularAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/weatherIo', {
        templateUrl: 'views/weatherIo.html',
        controller: 'WeatherIoCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  });
