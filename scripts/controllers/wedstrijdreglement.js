'use strict';

/**
 * @ngdoc function
 * @name attentiaPronostiekApp.controller:WedstrijdreglementCtrl
 * @description
 * # WedstrijdreglementCtrl
 * Controller of the attentiaPronostiekApp
 */
angular.module('attentiaPronostiekApp')
  .controller('WedstrijdreglementCtrl', function ($scope, $translate) {
    $scope.isNL = ($translate.use() == 'nl')
  });
