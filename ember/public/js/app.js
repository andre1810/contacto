App = Ember.Application.createWithMixins(Bootstrap);

App.Router.map(function() {
  this.route("dashboard", { path: "/" });
  this.resource("customers", function() {
    this.route("new");
    this.route("startWith", { path: '/startWith/:key' });
    this.route("search", { path: '/search/:keyword' });
  });
  this.resource("customer", { path: '/customer/:customer_id' });
});

App.ApplicationController = Ember.ArrayController.extend({
  actions: {
    search: function(keyword) {
      if (keyword != "") {
        App.set("keyword", keyword);
        this.transitionToRoute('customers.search', keyword);
      }
    }
  },
  overviewPathActive: function() {
    return this.get('currentPath') === 'dashboard';
  }.property('currentPath'),
  customersPathActive: function() {
    return (this.get('currentPath') === 'customers.index' || this.get('currentPath') === 'customers.search' || this.get('currentPath') === 'customers.startWith' || this.get('currentPath') === 'customer');
  }.property('currentPath'),
  newCustomerPathActive: function() {
    return this.get('currentPath') === 'customers.new';
  }.property('currentPath')
});