App.Contact = Ember.Model.extend({
  _id: attr(),
  customer: attr(),
  firstName: attr(),
  lastName: attr(), 
  position: attr(),
  phone: attr(),
  mobile: attr(),
  email: attr(),
  created: attr(),
  updated: attr()
});

App.Contact.adapter = Ember.RESTAdapter.create();
App.Contact.url = "contacts";
App.Contact.primaryKey = '_id';