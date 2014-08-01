ContactoApp.module("Entities", function(Entities, ContactoApp, Backbone, Marionette, $, _) {

  Entities.Contact = Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: 'contacts',

    defaults: {
        customer: null,
        position: '',
        firstName: '',
        lastName: '',
        phone: '',
        mobile: '',
        email: '',
        created: null,
        updated: null
    }
  });

  Entities.ContactCollection = Backbone.Collection.extend({
    initialize: function(models, options) {
      this.id = options.customerId;
    },
    url: function() {
      return '/customers/' + this.id + '/contacts';
    },
    model: Entities.Contact
  });

  var API = {
    getCustomerContacts: function(id) {
      var customers = new Entities.ContactCollection({}, { customerId: id });
      var defer = $.Deferred();
      customers.fetch({
        success: function(data) {
          defer.resolve(data);
        }
      });
      return defer.promise();
    }
  };

  ContactoApp.reqres.setHandler("contacts:by_customer_id", function(id) {
    return API.getCustomerContacts(id);
  });

});