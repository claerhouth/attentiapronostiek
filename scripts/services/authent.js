'use strict';

angular.module('attentiaPronostiekApp')
  .factory('authent', function authent($q, arango) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var isUserAuthenticated = false;
        var authenticatedUser = "";
        var isUserAdmin = false;

        var factory = {};

        factory.isUserAdmin = function () { return isUserAdmin };

        factory.isUserAuthenticated = function()
        {
            return isUserAuthenticated;
        }

        factory.authenticatedUser = function()
        {
            return authenticatedUser;
        }

        factory.authenticateUser = function (gebruiker) {


            var deferred = $q.defer();
            var callback = function (result) { deferred.resolve(result)};

            arango.authenticateUser(gebruiker).then(callback);

            return deferred.promise.then(function(result) {

                    if(result.error)
                    {

                        isUserAuthenticated = false;
                    }
                    else
                    {
                        authenticatedUser = gebruiker.gebruikersnaam;
                        isUserAdmin = result.admin;
                        isUserAuthenticated = true;
                    }
                    return result
                }
            );


        }

        factory.logout = function()
        {
            isUserAuthenticated = false;
        }


        return factory;
    });
