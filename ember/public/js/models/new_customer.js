App.NewCustomer = App.Customer.extend({});
App.NewCustomer.adapter = Ember.RESTAdapter.create();
App.NewCustomer.url = "customers/recently_added";
App.NewCustomer.primaryKey = '_id';