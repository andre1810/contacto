Template.dump.rendered = function() {
  Deps.autorun(function() {
    Meteor.subscribe("customers");
  })
};

Template.dump.totalCustomers = function() {
  return Customers.find({}).count();
};

Template.dump.names = function()
{
  return Customers.find({});
};