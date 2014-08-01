App.Address = Ember.Model.extend({
  _id: attr(),
  customer: attr(),
  label: attr(), 
  street: attr(),
  zip: attr(),
  city: attr(),
  state: attr(),
  country: attr(),
  created: attr(),
  updated: attr()
});

App.Address.adapter = Ember.RESTAdapter.create();
App.Address.url = "addresses";
App.Address.primaryKey = '_id';