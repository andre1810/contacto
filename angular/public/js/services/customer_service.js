'use strict';

angular.module('contactoApp').factory('CustomerService', function ($resource) {

  var srv = {};

  srv.getTotalCustomers = function(cb) {
    $resource('/customers/count').get({}, function(response) {
      return cb(response.count);
    });
  };

  srv.getRecentlyAddedCustomers = function(cb) {
    $resource('/customers/recently_added').query({}, function(response) {
      return cb(response);
    });
  };

  srv.getTags = function(cb) {
    $resource('/customers/tags').query({}, function(response) {
      return cb(response);
    });
  };

  srv.getCustomersByKey = function(key, cb) {
    $resource('/customers/startsWith/:key').query({ key: key }, function(response) {
      return cb(response);
    });
  };

  srv.getCustomersByKeyword = function(keyword, cb) {
    $resource('/customers/search/:keyword').query({ keyword: keyword }, function(response) {
      return cb(response);
    });
  };

  srv.getCustomerByCustomerId = function(customerId, cb) {
    $resource('/customers/byCustomerId/:customerId').get({ customerId: customerId }, function(response) {
      return cb(response);
    });
  };

  srv.getCustomerAddresses = function(id, cb) {
    $resource('/customers/:id/addresses').query({ id: id }, function(response) {
      return cb(response);
    });
  };

  srv.getCustomerContacts = function(id, cb) {
    $resource('/customers/:id/contacts').query({ id: id }, function(response) {
      return cb(response);
    });
  };

  srv.getCustomerNotes = function(id, cb) {
    $resource('/customers/:id/notes').query({ id: id }, function(response) {
      return cb(response);
    });
  };

  return {
    getTotalCustomers : function(cb) {
      return srv.getTotalCustomers(cb);
    },
    getRecentlyAddedCustomers : function(cb) {
      return srv.getRecentlyAddedCustomers(cb);
    },
    getTags : function(cb) {
      return srv.getTags(cb);
    },
    getCustomersByKey : function(key, cb) {
      return srv.getCustomersByKey(key, cb);
    },
    getCustomersByKeyword : function(keyword, cb) {
      return srv.getCustomersByKeyword(keyword, cb);
    },
    getCustomerByCustomerId : function(customerId, cb) {
      return srv.getCustomerByCustomerId(customerId, cb);
    },
    getCustomerAddresses : function(id, cb) {
      return srv.getCustomerAddresses(id, cb);
    },
    getCustomerContacts : function(id, cb) {
      return srv.getCustomerContacts(id, cb);
    },
    getCustomerNotes : function(id, cb) {
      return srv.getCustomerNotes(id, cb);
    }
  };
});