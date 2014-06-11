'use strict';

angular.module('attentiaPronostiekApp')
  .controller('MainCtrl', function ($scope, $location, $translate) {

        $scope.taal = 'nl';
        $scope.zetTaal = function()
        {
            $translate.use($scope.taal);
        };

  });
