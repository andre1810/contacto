Template.dashboard.rendered = function() {
  Deps.autorun(function() {
    Meteor.subscribe("customers");
  })
};

Template.dashboard.totalCustomers = function() {
  return Customers.find({}).count();
};

Template.dashboard.newCustomers = function() {
  var filterDate = new Date();
  filterDate.setDate(filterDate.getDate() -7); 

  return Customers.find({ created: { $gte: filterDate } });
};

Template.dashboard.totalNewCustomers = function() {
  var filterDate = new Date();
  filterDate.setDate(filterDate.getDate() - 3); 

  return Customers.find({ created: { $gte: filterDate } }).count();
};

var tagListHelper = { tagList: function(tags) { return tags.join(', '); } };
Template.dashboard.helpers(tagListHelper);

Template.dashboard.allTags = function() {
  var tags = [];
  Customers.find({}).forEach(function(customer) {
    tags.push(customer.tags);
  });

  return _.map(_.uniq(_.flatten(tags)), function(tag) { return { tag: tag }});
};