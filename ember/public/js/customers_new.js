App.CustomersNewController = Ember.Controller.extend({
  actions: {
    saveCustomer: function(customer) {
      var controller = this;
      customer.save().then(function(customer) {
        controller.transitionToRoute('customer', customer.get("_id"));
      }); 
    }
  }
});

App.CustomersNewRoute = Ember.Route.extend({
  setupController: function(controller) { 
    var model = App.Customer.create();
    controller.set('model', { customer: model });
  }
});