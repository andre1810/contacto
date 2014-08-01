'use strict';

angular.module('contactoApp').factory('Note', function ($resource) {
  return $resource('/notes/:id', { id: '@_id' },
    {
      'update': {
        method: 'PUT'
      }
    });
  });