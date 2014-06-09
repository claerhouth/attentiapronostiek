'use strict';

/**
 * @ngdoc filter
 * @name attentiaPronostiekApp.filter:pronostiekFilter
 * @function
 * @description
 * # pronostiekFilter
 * Filter in the attentiaPronostiekApp.
 */
angular.module('attentiaPronostiekApp')
  .filter('pronostiekFilter', function () {
        return function (input, groepnaam) {

            var res = [];

            var index = 0;
            for(index; index < input.length; index++)
            {
                if(input[index].groep == groepnaam)
                {
                    return true
                }
            }

            return false;
        };
  });
