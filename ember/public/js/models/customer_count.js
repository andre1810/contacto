App.CustomerCount = Ember.Model.extend({
  count: attr()
});
App.CustomerCount.adapter = Ember.RESTAdapter.create();
App.CustomerCount.url = "customers/count";