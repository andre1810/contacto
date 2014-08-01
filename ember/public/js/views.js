App.CustomersNavigationView = Ember.View.extend({
  templateName: 'customers-navigation'
});

App.CustomersTableView = Ember.View.extend({
  templateName: 'customers-table'
});

App.CustomerDataView = Ember.View.extend({
  templateName: 'customer-data'
});

App.SelectBranchView = Ember.Select.extend({
  content: ['Software Development','Consulting'],
  prompt: "Select Branch",
  classNames: ["form-control"]
});

App.CustomerAddressesView = Ember.View.extend({
  templateName: 'customer-addresses'
});

App.CustomerContactsView = Ember.View.extend({
  templateName: 'customer-contacts'
});

App.CustomerNotesView = Ember.View.extend({
  templateName: 'customer-notes'
});