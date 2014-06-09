'use strict';

/**
 * @ngdoc filter
 * @name attentiaPronostiekApp.filter:landfilter
 * @function
 * @description
 * # landfilter
 * Filter in the attentiaPronostiekApp.
 */
angular.module('attentiaPronostiekApp')
  .filter('landfilter', function () {
    return function (input) {
      return 'landfilter filter: ' + input;
    };
  });
