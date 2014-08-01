'use strict';

angular.module('contactoApp').factory('Address', function ($resource) {
  return $resource('/addresses/:id', { id: '@_id' },
    {
      'update': {
        method: 'PUT'
      }
    });
  });