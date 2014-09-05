Meteor.publish("customers", function() {
  return Customers.find();
});

Meteor.publish("addresses", function() {
  return Addresses.find();
});

Meteor.publish("contacts", function() {
  return Contacts.find();
});

Meteor.publish("notes", function() {
  return Notes.find();
});

 Meteor.methods({ 
  addCustomer: function(customer) {
    var lastCustomer = Customers.findOne({}, { sort: { _id:-1 } });
    var currentCustomerId = 10000;

    if (lastCustomer != null) {
      currentCustomerId = lastCustomer.customerId;
    }

    customer = _.extend(customer, { customerId : currentCustomerId + 1 })
    customer = _.extend(customer, { created: new Date() });

    console.log(customer);

    return Customers.insert(customer);
  },
  updateCustomer: function(id, data) {
    data = _.extend(data, { updated: new Date() });
    Customers.update({ _id: id }, { $set: data });
  },
  removeCustomer: function(id) {
    Addresses.remove({ customer: id });
    Contacts.remove({ customer: id });
    Notes.remove({ customer: id });
    Customers.remove({ _id: id });
  },

  addAddress: function(address) {
    address = _.extend(address, { created: new Date() });
    Addresses.insert(address);
    return address._id;
  },
  updateAddress: function(id, data) {
    data = _.extend(data, { updated: new Date() });
    Addresses.update({ _id: id }, { $set: data });
    return id;
  },
  removeAddress: function(id) {
    Addresses.remove({ _id: id });
  },

  addContact: function(contact) {
    contact = _.extend(contact, { created: new Date() });
    Contacts.insert(contact);
    return contact._id;
  },
  updateContact: function(id, data) {
    data = _.extend(data, { updated: new Date() });
    Contacts.update({ _id: id }, { $set: data });
    return id;
  },
  removeContact: function(id) {
    Contacts.remove({ _id: id });
  },

  addNote: function(note) {
    note = _.extend(note, { created: new Date() });
    Notes.insert(note);
    return note._id;
  },
  updateNote: function(id, data) {
    data = _.extend(data, { updated: new Date() });
    Notes.update({ _id: id }, { $set: data });
  },
  removeNote: function(id) {
    Notes.remove({ _id: id });
  },
  importDump : function()
  {
      var Data = {};
      Data = JSON.parse(Assets.getText("test-data.json"));
      Data.forEach(function(item){
         Meteor.default_server.method_handlers.addCustomer(item);
         //addCustomer(item);
      });
  }


});