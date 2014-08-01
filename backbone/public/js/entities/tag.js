ContactoApp.module("Entities", function(Entities, ContactoApp, Backbone, Marionette, $, _) {

  Entities.Tag = Backbone.Model.extend({
    defaults: {
      tag: ''
    }
  });

  Entities.TagCollection = Backbone.Collection.extend({
    url: "customers/tags",
    model: Entities.Tag
  });

  var API = {
    getTags: function() {
      var defer = $.Deferred();

      var names = [];

      $.get('/customers/tags/', {}, function(result) {

        var tagArray = _.map(result, function(tag) { return { tag: tag }; });    
        var tags = new Entities.TagCollection(tagArray);

        defer.resolve(tags);
      });
      
      return defer.promise();
    }
  };

  ContactoApp.reqres.setHandler("tags:entities", function() {
    return API.getTags();
  });

});