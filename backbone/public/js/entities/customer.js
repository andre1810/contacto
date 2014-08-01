ContactoApp.module("Entities", function(Entities, ContactoApp, Backbone, Marionette, $, _) {

  Entities.Customer = Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: 'customers',

    defaults: {
      customerId: 0,
      name: '',
      branch: '',
      website: '',
      reference: '',
      note: '', 
      tags: [],
      created: null
    }
  });

  Entities.CustomerCollection = Backbone.Collection.extend({
    url: "customers",
    model: Entities.Customer
  });

  var API = {
    getTotalCustomers: function() {
      var defer = $.Deferred();

      $.get('/customers/count', {}, function(count) {
        defer.resolve(count);
      });

      return defer.promise();
    },
    
    getTotalNewCustomers: function() {
      var defer = $.Deferred();
      $.get('/customers/recently_added', {}, function(customers) {
        defer.resolve(customers.length);
      });
      return defer.promise();
    },

    getRecentlyAddedCustomerEntities: function() {
      var defer = $.Deferred();
      $.get('/customers/recently_added', {}, function(customers) {
        defer.resolve(new Entities.CustomerCollection(customers));
      });
      return defer.promise();
    },

    getCustomerEntities: function() {
      var customers = new Entities.CustomerCollection();
      var defer = $.Deferred();
      customers.fetch({
        success: function(data) {
          defer.resolve(data);
        }
      });
      return defer.promise();
    },

    getCustomerEntitiesByKey: function(key) {
      var customers = new Entities.CustomerCollection();

      customers.url = '/customers/startsWith/' + key;
      var defer = $.Deferred();
      customers.fetch({
        success: function(data) {
          defer.resolve(data);
        }
      });
      return defer.promise();
    },

    getCustomerEntitiesByKeyword: function(keyword) {
      var customers = new Entities.CustomerCollection();

      customers.url = '/customers/search/' + keyword;
      var defer = $.Deferred();
      customers.fetch({
        success: function(data) {
          defer.resolve(data);
        }
      });
      return defer.promise();
    },

    getCustomerEntityByCustomerId: function(customerId) {
      var customer = new Entities.Customer();

      customer.url = '/customers/byCustomerId/' + customerId;
      var defer = $.Deferred();
      customer.fetch({
        success: function(data) {
          defer.resolve(data);
        }
      });
      var promise = defer.promise();
      $.when(promise).done(function(customer) {
        if(customer != null) {
          // Reset customer url
          customer.url = '/customers/' + customer.id;
        }
      });
      return promise;
    },

    getCustomerEntity: function(id) {
      var customer = new Entities.Customer({ _id: id });
      var defer = $.Deferred();
      customer.fetch({
        success: function(data) {
          defer.resolve(data);
        }
      });
      return defer.promise();
    }
  };

  ContactoApp.reqres.setHandler("customer:total", function() {
    return API.getTotalCustomers();
  });

  ContactoApp.reqres.setHandler("customer:total_new", function() {
    return API.getTotalNewCustomers();
  });

  ContactoApp.reqres.setHandler("customer:entities", function() {
    return API.getCustomerEntities();
  });

  ContactoApp.reqres.setHandler("customer:entities_new", function() {
    return API.getRecentlyAddedCustomerEntities();
  });

  ContactoApp.reqres.setHandler("customer:entities:by_key", function(key) {
    return API.getCustomerEntitiesByKey(key);
  });

  ContactoApp.reqres.setHandler("customer:entities:by_keyword", function(keyword) {
    return API.getCustomerEntitiesByKeyword(keyword);
  });

  ContactoApp.reqres.setHandler("customer:entity:by_customer_id", function(customerId) {
    return API.getCustomerEntityByCustomerId(customerId);
  });

  ContactoApp.reqres.setHandler("customer:entity", function(id) {
    return API.getCustomerEntity(id);
  });

});