/**
 * Created by hannes on 6/4/14.
 */

angular.module('attentiaPronostiekApp').factory('arango',function($http, $q) {

     var factory = {};

     factory.getBusinessUnits = function()
     {
        var deferred = $q.defer();
        var callback = function(result) { deferred.resolve(result) };

        $http.put('http://attarango.cloudapp.net:8529/_db/attentiapronostiek/_api/simple/all', {"collection": "businessunits"}).success(callback);

        return deferred.promise;
     };

    factory.registerUser = function(gebruiker)
    {

        $http.post('http://attarango.cloudapp.net:8529/_db/attentiapronostiek/_api/document?collection=gebruikers',
            {gebruikersnaam: gebruiker.nieuwegebruiker,
             email: gebruiker.email,
             wachtwoord: gebruiker.nieuwwachtwoord,
             voornaam: gebruiker.voornaam,
             naam: gebruiker.naam,
             buId: gebruiker.buId
              }).success(callback);
        return true;
    }

    factory.getUser = function(gebruiker)
    {
        var deferred = $q.defer();
        var callback = function(result) { deferred.resolve(result) };

        $http.put('http://attarango.cloudapp.net:8529/_db/attentiapronostiek/_api/simple/by-example',
            {"collection": "gebruikers", "example" : { "gebruikersnaam" : gebruiker.gebruikersnaam }
            }).success(callback);

        return deferred.promise;
    }

     return factory;
});









