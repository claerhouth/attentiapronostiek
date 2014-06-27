'use strict';

angular.module('attentiaPronostiekApp')
  .controller('PronostiekCtrl', function ($scope,$location,$filter,$translate ,authent, arango) {

        var landen = new Array();
        var groepen;
        var matchen = [];
        var matchtype = "P";

            if (!authent.isUserAuthenticated())
            {
                $location.path("/");
            }
            else if(authent.isUserAdmin())
            {
                $scope.isAdmin = true;
                matchtype = "R";
            }

            $scope.zetSpelfase = function()
            {
                arango.zetSpelfase($scope.spelfase);
            };


            $scope.initPronostiek = function(gemaaktepronostiek)
            {

                arango.getLanden().then(function (result) {
                        $scope.landen = [];


                        result.forEach (function(land) {
                            landen[land.attributes.landId] = land.attributes;

                            $scope.landen.push(land.attributes);
                        });

                        $scope.landen.sort(function (a,b) { return (a.landNaam > b.landNaam) ? 1 : (b.landNaam > a.landNaam) ? -1 : 0 });
                    });

                    arango.getSpelfase()
                        .then(function (spelfase) { arango.getGroepen(spelfase[0].attributes.spelfase)
                        .then(function (result) { groepen = result; arango.getMatchen(result)
                                .then(function (result) {
                                var matchencoll= result.matchen;

                                  matchencoll.forEach(function (matches)
                                  {
                                     matches.forEach(function (innermatch){

                                          matchen.push(innermatch);
                                      });
                                  }); $scope.maakPronostiek(gemaaktepronostiek); })
                        })
                        });
            };

            $scope.maakPronostiek = function(gemaaktepronostiek)
            {


                var usermatchGroepen = [];

                groepen= groepen.sort(function(a,b) {return a.attributes.groepId > b.attributes.groepId});

                groepen.forEach(function(groep)
                {
                    var groepmatchen = $filter('groepFilter')(matchen, groep.attributes.groepId);
                    var userMatchGroep = [];

                    var filter = true;

                    if(gemaaktepronostiek.length > 0)
                    {
                        filter = !$filter('pronostiekFilter')(gemaaktepronostiek[0].attributes.matchResultaten, groep.attributes.groepNaam)
                    }

                    if(filter)
                    {

                        $scope.showButton = true;


                        groepmatchen.sort(function(a,b){ return a.attributes.tijdstip > b.attributes.tijdstip}).forEach(function(match)
                        {


                            var usermatch = {};
                            usermatch.matchId = match.attributes.matchId;
                            usermatch.groep = groep.attributes.groepNaam;
                            usermatch.landA = landen[match.attributes.landA].landNaam;
                            usermatch.landB = landen[match.attributes.landB].landNaam;
                            usermatch.resultaatA = 0;
                            usermatch.resultaatB = 0;

                            usermatch.type = matchtype;

                            userMatchGroep.push(usermatch);
                        });
                        usermatchGroepen.push({ naam: groep.attributes.groepNaam, groep: userMatchGroep });
                    }

                });

                if(gemaaktepronostiek.length > 0)
                {
                    $scope.gekozenLand = landen[gemaaktepronostiek[0].attributes.land].landNaam;
                    var vulGroep = {};
                    $translate('VORIGE_PRONOSTIEKEN').then(function (translation) { vulGroep.naam = translation });
                    vulGroep.groep= [];
                    usermatchGroepen.push(vulGroep);

                    var bestaandeGroepen = [];

                    gemaaktepronostiek[0].attributes.matchResultaten.forEach( function (match) {

                        if(authent.isUserAdmin())
                        {
                            match.disabled = false;
                        }
                        else
                        {
                            match.disabled = true;
                        }

                        if(!bestaandeGroepen[match.groep])
                        {
                            bestaandeGroepen[bestaandeGroepen.length] = match.groep;
                            bestaandeGroepen[match.groep] = { naam: match.groep, groep: []}
                        }

                        bestaandeGroepen[match.groep].groep.push(match);
                    });

                    var index = 0;

                    bestaandeGroepen.sort();

                    for(index; index < bestaandeGroepen.length; index++)
                    {
                        usermatchGroepen.push(bestaandeGroepen[bestaandeGroepen[index]]);
                    }
                }


                $scope.userMatchGroepen = usermatchGroepen;

                if(authent.isUserAdmin())
                {
                    $scope.showButton = true;
                }
            };

            $scope.savePronostiek = function ()
            {
                var pronostiek = {};

                if($scope.gekozenLand)
                {
                  pronostiek.land = $scope.gekozenLand;
                }
                else
                {
                  pronostiek.land = 99;
                }
                
                
                console.log(pronostiek.land);
                pronostiek.matchResultaat = [];
                pronostiek.gebruikersnaam = authent.authenticatedUser().gebruikersnaam;

                var matchGroepen = $scope.userMatchGroepen;

                 matchGroepen.forEach(function(matchen)
                 {
                     matchen.groep.forEach(function(usermatch)
                     {

                         if(usermatch.resultaatA == usermatch.resultaatB)
                         {
                         usermatch.voorspelling = "=";
                         }
                         else if(usermatch.resultaatA > usermatch.resultaatB)
                         {
                         usermatch.voorspelling = "1";
                         }
                         else
                         {
                         usermatch.voorspelling = "2";
                         }

                         pronostiek.matchResultaat.push(usermatch);
                     });
                 });

                arango.savePronostiek(pronostiek).then(function() { arango.getPronostiek(authent.authenticatedUser().gebruikersnaam).then(function(result) {
                    $scope.showButton = false; $scope.initPronostiek(result) }); });
            };

            $scope.berekenResultaten = function()
            {
                console.log("Resultaten");
                arango.berekenResultaten();
            }

            arango.getPronostiek(authent.authenticatedUser().gebruikersnaam).then(function(result) { $scope.initPronostiek(result) });
    });







