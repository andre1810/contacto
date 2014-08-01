ContactoApp.module("Entities", function(Entities, ContactoApp, Backbone, Marionette, $, _) {

  Entities.Address = Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: 'addresses',

    defaults: {
        customer: null,
        label: '',
        street: '',
        zip: '',
        city: '',
        state: '',
        country: '',
        created: null,
        updated: null
    }
  });

  Entities.AddressCollection = Backbone.Collection.extend({
    initialize: function(models, options) {
      this.id = options.customerId;
    },
    url: function() {
      return '/customers/' + this.id + '/addresses';
    },
    model: Entities.Address
  });

  var API = {
    getCustomerAddresses: function(id) {
      var customers = new Entities.AddressCollection({}, { customerId: id });
      var defer = $.Deferred();
      customers.fetch({
        success: function(data) {
          defer.resolve(data);
        }
      });
      return defer.promise();
    }
  };

  ContactoApp.reqres.setHandler("addresses:by_customer_id", function(id) {
    return API.getCustomerAddresses(id);
  });

});