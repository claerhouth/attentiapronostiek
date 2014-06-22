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
            $scope.buScores = resultaat.buScores.sort(function (a, b) { return (a.score > b.score) ? 1 : (b.score > a.score) ? -1 : 0 });
            $scope.userScores = resultaat.userScores.sort(function (a, b) { return (a.punten > b.punten) ? 1 : (b.punten > a.punten) ? -1 : 0 });

        };

        arango.getGebruikersPunten(authent.authenticatedUser().gebruikersnaam).then(function(result) {$scope.initResultaat(result)});



    });