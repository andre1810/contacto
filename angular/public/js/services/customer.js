'use strict';

angular.module('contactoApp').factory('Customer', function ($resource) {
  return $resource('/customers/:id', { id: '@_id' },
    {
      'update': {
        method: 'PUT'
      }
    });
  });