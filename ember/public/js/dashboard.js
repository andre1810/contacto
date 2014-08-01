App.DashboardController = Ember.Controller.extend({
  actions: {
    deleteCustomer: function(customer) {
      var customerRecord = App.Customer.findById(customer.get("_id"));
      customerRecord.deleteRecord();
      this.content.newCustomers.removeObject(customer);
    }
  }
});

App.DashboardRoute = Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({ 
      newCustomers: App.NewCustomer.find(), 
      customers: App.Customer.find(), 
      tags: App.Tag.find()
    });
  },
  beforeModel: function() {
  	App.NewCustomer.clearCache();
  	App.Customer.clearCache();
  	App.Tag.clearCache();
  } 
});