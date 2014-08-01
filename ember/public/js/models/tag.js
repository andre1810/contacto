App.Tag = Ember.Model.extend({
  tag: attr()
});
App.Tag.adapter = Ember.RESTAdapter.create();
App.Tag.url = "customers/tags";