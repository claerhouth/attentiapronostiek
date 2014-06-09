'use strict';

/**
 * @ngdoc filter
 * @name attentiaPronostiekApp.filter:groepFilter
 * @function
 * @description
 * # groepFilter
 * Filter in the attentiaPronostiekApp.
 */
angular.module('attentiaPronostiekApp')
  .filter('groepFilter', function ()
    {
    return function (input, groepId) {

        var res = [];

        var index = 0;
        for(index; index < input.length; index++)
        {
            if(input[index].attributes.groep == groepId)
            {
                res.push(input[index]);
            }
        }

        return res;
    };
  });
