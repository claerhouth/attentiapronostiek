'use strict';

/**
 * @ngdoc function
 * @name attentiaPronostiekApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the attentiaPronostiekApp
 */
angular.module('attentiaPronostiekApp')
  .controller('LogoutCtrl', function ($scope, authent) {

        authent.logout();

  });
