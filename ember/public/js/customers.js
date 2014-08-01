App.CustomersIndexController = Ember.ArrayController.extend({
  actions: {
    deleteCustomer: function(customer) {
      customer.deleteRecord();
    }
  }
});

App.CustomersRoute = Ember.Route.extend({
  actions: {
    deleteCustomer: function(customer) {
      customerRecord = App.Customer.find(customer._id);
      customerRecord.deleteRecord();
      this.content.removeObject(customer);
    }
  },
  model: function() {
    return App.Customer.find();
  }
});

App.CustomersStartWithController = App.CustomersIndexController.extend({
  actions: {
    deleteCustomer: function(customer) {
      customerRecord = App.Customer.find(customer._id);
      customerRecord.deleteRecord();
      this.content.removeObject(customer);
    }
  },
});

App.CustomersStartWithRoute = Ember.Route.extend({
  model: function(params) {
    return Ember.$.getJSON('/customers/startsWith/' + params.key + '.json');
  },
  renderTemplate: function() {
    this.render('customers/startWith');
  },
  setupController: function(controller, model) {
    controller.set("model", model);
    controller.set("keyword", App.get("keyword"));
  }
});

App.CustomersSearchController = Ember.ArrayController.extend({
  keyword: null,
  actions: {
    deleteCustomer: function(customer) {
      customerRecord = App.Customer.find(customer._id);
      customerRecord.deleteRecord();
      this.content.removeObject(customer);
    }
  }
});

App.CustomersSearchRoute = Ember.Route.extend({
  model: function(params) {
    App.set("keyword", params.keyword);
    return Ember.$.getJSON('/customers/search/' + params.keyword + '.json');
  },
  beforeModel: function() {
    App.Customer.clearCache();
  },
  renderTemplate: function() {
    this.render('customers/search');
  },
  setupController: function(controller, model) {
    controller.set("model", model);
    controller.set("keyword", App.get("keyword"));
  }
});