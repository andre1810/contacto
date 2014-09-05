Router.configure({
    layoutTemplate: 'contactoLayout'
});

Router.map(function() {
  this.route('dashboard', { path: '/' });
  this.route('dump', { 
    path: '/dump', 
    waitOn: function () { 
      Meteor.call('importDump'); 
    }
  });
  this.route('customers', { 
    path: '/customers',
    waitOn: function () {
      return Meteor.subscribe('customers');
    },
    data: function () {
      return { customers: Customers.find({}) };
    }
  });

  this.route('customersStartWith', { 
    path: '/customers/startWith/:key',
    waitOn: function () {
      return Meteor.subscribe('customers');
    },
    data: function () {
      return { customers: Customers.find({ "name": new RegExp('^' + this.params.key) }) };
    }
  });

  this.route('customer', { 
    path: '/customer/:customer_id',
    waitOn: function () {
      return [
        Meteor.subscribe('customers'),
        Meteor.subscribe('addresses'),
        Meteor.subscribe('contacts'),
        Meteor.subscribe('notes')
      ];
    },
    data: function () {
      return { 
        customer: Customers.findOne({ _id: this.params.customer_id }),
        addresses: Addresses.find({ customer: this.params.customer_id }), 
        contacts: Contacts.find({ customer: this.params.customer_id }),
        notes: Notes.find({ customer: this.params.customer_id })
      };
    }
  });

  this.route('customersSearch', { 
    path: '/customers/search/:keyword',
    waitOn: function () {
      return Meteor.subscribe('customers');
    },
    data: function () {
      var tags = this.params.keyword.split(',');

      Session.set("keyword", this.params.keyword);

      return { 
        keyword: this.params.keyword, 
        customers: Customers.find({ $or: [{ "name": new RegExp(this.params.keyword) }, { tags: { $in: tags } } ] }) 
      };
    }
  });

  this.route('newCustomer', { 
    path: '/customers/new',
    waitOn: function () {
      return Meteor.subscribe('customers');
    }
  });
});

Template.contactoLayout.keyword = function() {
  return Session.get("keyword");
};

Template.contactoLayout.events = {
  'keypress #searchField': function(e, tpl) {
    if(e.keyCode == 13) {
      Router.go('/customers/search/' + e.target.value);
    }
  }
};


