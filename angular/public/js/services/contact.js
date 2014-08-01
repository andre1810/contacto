'use strict';

angular.module('contactoApp').factory('Contact', function ($resource) {
  return $resource('/contacts/:id', { id: '@_id' },
    {
      'update': {
        method: 'PUT'
      }
    });
  });