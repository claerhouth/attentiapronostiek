'use strict';

angular.module('attentiaPronostiekApp')
  .factory('authent', function authent($q, arango) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var isUserAuthenticated = false;

        var factory = {};

        factory.isUserAuthenticated = function()
        {
            return isUserAuthenticated;
        }

        factory.authenticateUser = function (gebruiker) {


            var deferred = $q.defer();
            var callback = function (result) { deferred.resolve(result)};

            arango.getUser(gebruiker).then(callback);

            return deferred.promise.then(function(result) {

                    if (result.result[0].wachtwoord == gebruiker.wachtwoord) {
                        isUserAuthenticated = true;
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            );


        }


        return factory;
    });
