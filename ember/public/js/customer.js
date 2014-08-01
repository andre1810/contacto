App.CustomerController = Ember.Controller.extend({
  currentAddress: null,
  currentContact: null,
  currentNote: null,

  addressModalButtons: [
      Ember.Object.create({title: 'Save', clicked: "saveAddress"}),
      Ember.Object.create({title: 'Cancel', clicked: "rollbackAddress"})
  ],

  contactModalButtons: [
      Ember.Object.create({title: 'Save', clicked: "saveContact"}),
      Ember.Object.create({title: 'Cancel', clicked: "rollbackContact"})
  ],

  noteModalButtons: [
      Ember.Object.create({title: 'Save', clicked: "saveNote"}),
      Ember.Object.create({title: 'Cancel', clicked: "rollbackNote"})
  ],

  actions: {
    saveCustomer: function(customer) {
      customer.save();
    }, 
    addAddress: function(customer) {
      this.currentAddress = App.Address.create();
      this.currentAddress.set("customer", customer.get("_id"));
      Bootstrap.ModalManager.open('addressModal', "Add Address", 'address-modal', this.addressModalButtons, this);
    },
    editAddress: function(address) {
      this.currentAddress = address;
      Bootstrap.ModalManager.open('addressModal', "Edit Address " + this.currentAddress.get("label"), 'address-modal', this.addressModalButtons, this);
    },
    rollbackAddress: function() {
      var address = this.currentAddress;

      if (address.get("isNew") == false && address.get("isDirty")) {
        _.each(_.uniq(address._dirtyAttributes), function(attribute) {
          address.set(attribute, _.property(attribute)(address._data));
        });
      }

      if (address.get("isNew")) {
        address = null;
      }
      return Bootstrap.ModalManager.close('addressModal');
    },
    saveAddress: function() {
      if (this.currentAddress.get("isNew")) {
        this.get("model").addresses.addObject(this.currentAddress);
      }
      this.currentAddress.save();

      return Bootstrap.ModalManager.close('addressModal');
    },
    deleteAddress: function(address) {
      this.get("model").addresses.removeObject(address);
      address.deleteRecord();
    },

    addContact: function(customer) {
      this.currentContact = App.Contact.create();
      this.currentContact.set("customer", customer.get("_id"));
      Bootstrap.ModalManager.open('contactModal', "Add Contact", 'contact-modal', this.contactModalButtons, this);
    },
    editContact: function(contact) {
      this.currentContact = contact;
      Bootstrap.ModalManager.open('contactModal', "Edit Contact " + this.currentContact.get("firstName") + " "  + this.currentContact.get("lastName"), 'contact-modal', this.contactModalButtons, this);
    },
    rollbackContact: function() {
      var contact = this.currentContact;

      if (contact.get("isNew") == false && contact.get("isDirty")) {
        _.each(_.uniq(contact._dirtyAttributes), function(attribute) {
          contact.set(attribute, _.property(attribute)(contact._data));
        });
      }

      if (contact.get("isNew")) {
        contact = null;
      }
      return Bootstrap.ModalManager.close('contactModal');
    },
    saveContact: function() {
      if (this.currentContact.get("isNew")) {
        this.get("model").contacts.addObject(this.currentContact);
      }
      this.currentContact.save();

      return Bootstrap.ModalManager.close('contactModal');
    },
    deleteContact: function(contact) {
      this.get("model").contacts.removeObject(contact);
      contact.deleteRecord();
    },

    addNote: function(customer) {
      this.currentNote = App.Note.create();
      this.currentNote.set("customer", customer.get("_id"));
      Bootstrap.ModalManager.open('noteModal', "Add Note", 'note-modal', this.noteModalButtons, this);
    },
    editNote: function(note) {
      this.currentNote = note;
      Bootstrap.ModalManager.open('noteModal', "Edit Note " + this.currentNote.get("title"), 'note-modal', this.noteModalButtons, this);
    },
    rollbackNote: function() {
      var note = this.currentNote;

      if (note.get("isNew") == false && note.get("isDirty")) {
        _.each(_.uniq(note._dirtyAttributes), function(attribute) {
          note.set(attribute, _.property(attribute)(note._data));
        });
      }

      if (note.get("isNew")) {
        note = null;
      }
      return Bootstrap.ModalManager.close('noteModal');
    },
    saveNote: function() {
      if (this.currentNote.get("isNew")) {
        this.get("model").notes.addObject(this.currentNote);
      }
      this.currentNote.save();

      return Bootstrap.ModalManager.close('noteModal');
    },
    deleteNote: function(note) {
      this.get("model").notes.removeObject(note);
      note.deleteRecord();
    },
  }
});

App.ModalController = Ember.ObjectController.extend({
  actions: {
    close: function() {
      return this.send('closeModal');
    }
  }
});

App.ModalDialogComponent = Ember.Component.extend({
  actions: {
    close: function() {
      return this.sendAction();
    }
  }
});

App.CustomerRoute = Ember.Route.extend({
  model: function(params) {
    return Ember.RSVP.hash({ 
      customer: App.Customer.find(params.customer_id),
      addresses: Ember.$.getJSON('/customers/' + params.customer_id + '/addresses.json'),
      contacts: Ember.$.getJSON('/customers/' + params.customer_id + '/contacts.json'),
      notes: Ember.$.getJSON('/customers/' + params.customer_id + '/notes.json')
    })
  },
  afterModel: function(models) {
    var addresses = [];
    _.each(models.addresses, function(address) {
      var editAddress = App.Address.create(address);
      editAddress.set("isNew", false);
      addresses.push(editAddress);
    });
    models.addresses = addresses;

    var contacts = [];
    _.each(models.contacts, function(contact) {
      var editContact = App.Contact.create(contact);
      editContact.set("isNew", false);
      contacts.push(editContact);
    });
    models.contacts = contacts;

    var notes = [];
    _.each(models.notes, function(note) {
      var editNote = App.Note.create(note);
      editNote.set("isNew", false);
      notes.push(editNote);
    });
    models.notes = notes;
  }
});