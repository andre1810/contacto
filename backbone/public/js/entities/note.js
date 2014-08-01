ContactoApp.module("Entities", function(Entities, ContactoApp, Backbone, Marionette, $, _) {

  Entities.Note = Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: 'notes',

    defaults: {
        customer: null,
        title: '',
        note: '',
        created: null,
        updated: null
    }
  });

  Entities.NoteCollection = Backbone.Collection.extend({
    initialize: function(models, options) {
      this.id = options.customerId;
    },
    url: function() {
      return '/customers/' + this.id + '/notes';
    },
    model: Entities.Note
  });

  var API = {
    getCustomerNotes: function(id) {
      var customers = new Entities.NoteCollection({}, { customerId: id });
      var defer = $.Deferred();
      customers.fetch({
        success: function(data) {
          defer.resolve(data);
        }
      });
      return defer.promise();
    }
  };

  ContactoApp.reqres.setHandler("notes:by_customer_id", function(id) {
    return API.getCustomerNotes(id);
  });

});