'use strict';

angular.module('attentiaPronostiekApp')
  .controller('UserCtrl', function ($scope, $location, arango, authent) {

        $scope.gebruiker = {};

        $scope.registerUser = function ()
        {
            var ok = arango.registerUser($scope.gebruiker);

            ok.then(function (result) {
                    console.log(result);
                    if(result.error )
                    {
                        $scope.registerErrorMessage = result.error;
                    }
                    else
                    {
                        $scope.gebruiker.gebruikersnaam = $scope.gebruiker.nieuwegebruiker;
                        $scope.gebruiker.wachtwoord = $scope.gebruiker.nieuwwachtwoord;

                        authent.authenticateUser($scope.gebruiker).then(function (success) { $location.path("/mijnpronostiek");});

                    }});
        }


        $scope.login = function ()
        {
            authent.authenticateUser($scope.gebruiker).then(function (success)
            {
                console.log(success);
                if(success.error)
                {
                    console.log("succes");
                    $scope.loginErrorMessage = success.error;
                }
                else
                {
                    $location.path("/mijnpronostiek");

                }
            });
        }

        arango.getBusinessUnits().then(function(result) { $scope.businessunits = result});

  });
