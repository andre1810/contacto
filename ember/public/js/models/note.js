App.Note = Ember.Model.extend({
  _id: attr(),
  customer: attr(),
  title: attr(),
  note: attr(), 
  created: attr(),
  updated: attr()
});

App.Note.adapter = Ember.RESTAdapter.create();
App.Note.url = "notes";
App.Note.primaryKey = '_id';