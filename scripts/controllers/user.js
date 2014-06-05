'use strict';

angular.module('attentiaPronostiekApp')
  .controller('UserCtrl', function ($scope, $location, arango, authent) {

        $scope.gebruiker = {};

        $scope.registerUser = function ()
        {
            var ok = arango.registerUser($scope.gebruiker);

            if(ok)
                $location.path("/mijnpronostiek");
            else
                $scope.registerErrorMessage = "Gebruikersnaam bestaat al";
        }


        $scope.login = function ()
        {
            authent.authenticateUser($scope.gebruiker).then(function (success)
            {
                console.log(success);
                if(success)
                {
                    $location.path("/mijnpronostiek");
                }
                else
                {
                    $scope.loginErrorMessage = "Ongeldige gebruikersnaam of wachtwoord";
                }
            });
        }

        arango.getBusinessUnits().then(function(result) { $scope.businessunits = result.result});

  });
