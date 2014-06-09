/**
 * Created by hannes on 6/9/14.
 */
'use strict';

angular.module('attentiaPronostiekApp')
    .controller('ResultatenCtrl', function ($scope, $location, arango, authent)
    {

        if (!authent.isUserAuthenticated())
        {
            $location.path("/");
        }


        $scope.initResultaat = function(resultaat)
        {
            $scope.gebruikersPunten = resultaat.punten;
            $scope.buScores = resultaat.buScores;
            $scope.klassement = resultaat.userScores;
        };

        arango.getGebruikersPunten(authent.authenticatedUser()).then(function(result) {$scope.initResultaat(result)});



    });