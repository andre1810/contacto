ContactoApp.module("Entities", function(Entities, ContactoApp, Backbone, Marionette, $, _) {

  Entities.SearchResult = Backbone.Model.extend({
    defaults: {
      keyword: '',
      customersFound: 0
    }
  });

});