var tagListHelper = { tagList: function(tags) { return tags.join(', '); } };
Template.customersStartWith.helpers(tagListHelper);

Template.customersStartWith.events = {
  'click .deleteCustomer': function(e) {
    Meteor.call('removeCustomer', e.currentTarget.getAttribute("data-id"));
  }
};