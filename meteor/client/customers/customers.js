var tagListHelper = { 
  tagList: function(tags) { 
    if (tags == null)
      return null; 
    return tags.join(', '); 
  } 
};

Template.customers.helpers(tagListHelper);

Template.customers.events = {
  'click .deleteCustomer': function(e) {
    Meteor.call('removeCustomer', e.currentTarget.getAttribute("data-id"));
  }
};