Template.newCustomer.events = {
  'click .saveCustomer': function(e, tpl) {
    e.preventDefault();

    var tags = [];
    var tagList = tpl.find("#customer_tags").value;

    if (tagList.length > 0)
      tags = tagList.split(',');

    var data = {
      name: tpl.find("#customer_name").value,
      branch: tpl.find("#customer_branch").value,
      website: tpl.find("#customer_website").value,
      tags: tags,
      reference: tpl.find("#customer_reference").value,
      note: tpl.find("#customer_note").value,
    };

    var id = Meteor.call('addCustomer', data, function(error, _id) {
      if (error) {
        alert("An error occured");
      }
      else {
        Router.go('/customer/' + _id);
      } 
    });
  }
};