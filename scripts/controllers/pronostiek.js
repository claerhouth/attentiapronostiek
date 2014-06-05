'use strict';

angular.module('attentiaPronostiekApp')
  .controller('PronostiekCtrl', function ($scope,$location ,authent, arango) {

            if (!authent.isUserAuthenticated())
            {
                $location.path("/");
            }

            function initPronostiek(pronostiek)
            {
                if(pronostiek == null)
                {
                    arango.getWedstrijden().then(function (result) maakpronostiek(result.result));
                }
                else
                {
                    $scope.pronostiek = pronostiek;
                }
            }

            function maakPronostiek(wedstrijden)
            {
                var pronostiek = {};
                for(var w in wedstrijden)
                {

                }
            }

            arango.getPronostiek().then(function(result) { initPronostiek(result.result) });
    });







