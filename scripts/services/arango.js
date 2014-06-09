/**
 * Created by hannes on 6/4/14.
 */

angular.module('attentiaPronostiekApp').factory('arango',function($http, $q) {

     var factory = {};

     factory.getBusinessUnits = function()
     {
        var deferred = $q.defer();
        var callback = function(result) { deferred.resolve(result) };

        $http.get('http://attarango.cloudapp.net:8529/_db/attentiapronostiek/attentiabackend/businessunits').success(callback);

        return deferred.promise;
     };

    factory.registerUser = function(gebruiker)
    {
        var deferred = $q.defer();
        var callback = function(result) { deferred.resolve(result) };


        $http.post('http://attarango.cloudapp.net:8529/_db/attentiapronostiek/attentiabackend/user',
            {gebruikersnaam: gebruiker.nieuwegebruiker,
             email: gebruiker.email,
             wachtwoord: gebruiker.nieuwwachtwoord,
             voornaam: gebruiker.voornaam,
             naam: gebruiker.naam,
             buId: gebruiker.buId
              }).success(callback);

        return deferred.promise;
    };

    factory.getUser = function(gebruiker)
    {
        var deferred = $q.defer();
        var callback = function(result) { deferred.resolve(result) };

        $http.get('http://attarango.cloudapp.net:8529/_db/attentiapronostiek/attentiabackend/user/' + gebruiker.gebruikersnaam ).success(callback);

        return deferred.promise;
    };

    factory.authenticateUser = function(gebruiker)
        {
            var deferred = $q.defer();
            var callback = function(result) { deferred.resolve(result) };

            $http.post('http://attarango.cloudapp.net:8529/_db/attentiapronostiek/attentiabackend/auth/',
                { gebruikersnaam: gebruiker.gebruikersnaam,
                    wachtwoord: gebruiker.wachtwoord }

            ).success(callback);

            return deferred.promise;
        };

    factory.isUserAdmin = function(gebruiker)
    {
        var deferred = $q.defer();
        var callback = function(result) { deferred.resolve(result) };

        $http.post('http://attarango.cloudapp.net:8529/_db/attentiapronostiek/attentiabackend/auth/',
            { gebruikersnaam: gebruiker
                 }

        ).success(callback);

        return deferred.promise;
    };

    factory.getSpelfase = function()
    {
        var deferred = $q.defer();
        var callback = function(result) { deferred.resolve(result) };

        $http.get('http://attarango.cloudapp.net:8529/_db/attentiapronostiek/attentiabackend/spelfase/').success(callback);

        return deferred.promise;
    }

    factory.getGroepen = function(spelfase)
    {
        var deferred = $q.defer();
        var callback = function(result) { deferred.resolve(result) };

        $http.get('http://attarango.cloudapp.net:8529/_db/attentiapronostiek/attentiabackend/groep/' + spelfase).success(callback);

        return deferred.promise;
    };

    factory.getMatchen = function(groepen)
    {
        var deferred = $q.defer();
        var callback = function(result) { deferred.resolve(result) };

        var groepids = [];
        var index = 0;

        for(index; index < groepen.length; index++)
        {
            groepids.push(groepen[index].attributes.groepId);
        }


        $http.post('http://attarango.cloudapp.net:8529/_db/attentiapronostiek/attentiabackend/match/',{ groep: groepids} ).success(callback);


        return deferred.promise;
    };

    factory.getLanden = function()
    {
        var deferred = $q.defer();
        var callback = function(result) { deferred.resolve(result) };

        $http.get('http://attarango.cloudapp.net:8529/_db/attentiapronostiek/attentiabackend/land/').success(callback);

        return deferred.promise;
    }

    
    factory.savePronostiek = function(prono)
    {
        var deferred = $q.defer();
        var callback = function(result) { deferred.resolve(result) };

        $http.post('http://attarango.cloudapp.net:8529/_db/attentiapronostiek/attentiabackend/pronostiek/',
            {  "gebruikersnaam": prono.gebruikersnaam,
                "matchResultaten": prono.matchResultaat,
                "land": prono.land}).success(callback);

        return deferred.promise;
    }

    factory.getPronostiek= function(gebruikersnaam)
    {
        var deferred = $q.defer();
        var callback = function(result) { deferred.resolve(result) };

        $http.get('http://attarango.cloudapp.net:8529/_db/attentiapronostiek/attentiabackend/pronostiek/' + gebruikersnaam).success(callback);

        return deferred.promise;
    }

    factory.zetSpelfase = function(spelFase)
    {
        var deferred = $q.defer();
        var callback = function(result) { deferred.resolve(result) };

        $http.post('http://attarango.cloudapp.net:8529/_db/attentiapronostiek/attentiabackend/spelfase/',
            { "faseId": 1, "spelfase": parseInt(spelFase) }
        );

        return deferred.promise;
    }


    factory.getGebruikersPunten = function(gebruikersnaam)
    {
        var deferred = $q.defer();
        var callback = function(result) { deferred.resolve(result) };

        $http.post('http://attarango.cloudapp.net:8529/_db/attentiapronostiek/attentiabackend/resultaten/' + gebruikersnaam).success(callback);

        return deferred.promise;
    }

    factory.berekenResultaten = function()
    {
        var deferred = $q.defer();
        var callback = function(result) { deferred.resolve(result) };

        $http.post('http://attarango.cloudapp.net:8529/_db/attentiapronostiek/attentiabackend/resultaten');

        return deferred.promise;
    }

     return factory;
});









