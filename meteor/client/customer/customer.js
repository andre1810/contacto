var tagListHelper = { 
  tagList: function(tags) { 
    if (tags == null)
      return null; 
    return tags.join(', ');
  } 
};

Template.customerData.helpers(tagListHelper);

Template.customerData.rendered = function() {
  $(this.find('#customer_branch')).val($(this.find('#customer_branch_backup')).val());
}

Template.customerData.events = {
  'click .saveCustomer': function(e, tpl) {
    e.preventDefault();

    var tags = [];
    var tagList = tpl.find("#customer_tags").value;

    if (tagList.length > 0)
      tags = tagList.split(',');

    var id = tpl.find("#customer_id").value;
    var data = {
      name: tpl.find("#customer_name").value,
      branch: tpl.find("#customer_branch").value,
      website: tpl.find("#customer_website").value,
      tags: tags,
      reference: tpl.find("#customer_reference").value,
      note: tpl.find("#customer_note").value,
    };

    Meteor.call('updateCustomer', id, data, function(error) {
      if (_.isUndefined(error)) {
        $("button.saveCustomer").addClass("btn-success");
        setTimeout(function() {
          $("button.saveCustomer").removeClass("btn-success");
        }, 2000);
      }
      else {
        $("button.saveCustomer").addClass("btn-danger");
      }
    });
  }
};

Template.editAddress.address = function() {
  return Session.get("currentAddress");
};

Template.editContact.contact = function() {
  return Session.get("currentContact");
};

Template.editNote.note = function() {
  return Session.get("currentNote");
};

Template.addresses.events = {
  'click .addAddress': function(e, tpl) {
    e.preventDefault();

    Session.set("currentAddress", null);
    var customer_id = e.currentTarget.getAttribute("data-id");

    var addressModal = {
      template: Template.editAddress,
      title: "New Address",
      buttons: {
        cancel: {
          class: 'btn-default',
          label: 'Cancel'
        },
        ok: {
          class: 'btn-success',
          label: 'Save Address'
        }
      }
    };

    var modal = ReactiveModal.initDialog(addressModal);

    modal.buttons.ok.on('click', function(button) {

      var data = {
        customer: customer_id,
        label: $(modal.modalTarget).find('[name=address_label]').val(),
        street: $(modal.modalTarget).find('[name=address_street]').val(),
        zip: $(modal.modalTarget).find('[name=address_zip]').val(),
        city: $(modal.modalTarget).find('[name=address_city]').val(),
        state: $(modal.modalTarget).find('[name=address_state]').val(),
        country: $(modal.modalTarget).find('[name=address_country]').val()
      };
      
      Meteor.call("addAddress", data);
      modal = null;
      addressModal = null;
    });

    modal.show();

  },
  'click .editAddress': function(e, tpl) {
    e.preventDefault();

    var address = tpl.data.addresses.collection.findOne({ _id: e.currentTarget.getAttribute("data-id") });
    Session.set("currentAddress", address);

    var addressModal = {
      template: Template.editAddress,
      title: "Edit Address",
      buttons: {
        cancel: {
          class: 'btn-default',
          label: 'Cancel'
        },
        ok: {
          class: 'btn-success',
          label: 'Save Address'
        }
      }
    };

    var modal = ReactiveModal.initDialog(addressModal);

    modal.buttons.ok.on('click', function(button) {

      var data = {
        label: $(modal.modalTarget).find('[name=address_label]').val(),
        street: $(modal.modalTarget).find('[name=address_street]').val(),
        zip: $(modal.modalTarget).find('[name=address_zip]').val(),
        city: $(modal.modalTarget).find('[name=address_city]').val(),
        state: $(modal.modalTarget).find('[name=address_state]').val(),
        country: $(modal.modalTarget).find('[name=address_country]').val()
      };
    
      Meteor.call("updateAddress", address._id, data);
    });

    modal.show();

  },
  'click .deleteAddress': function(e, tpl) {
    e.preventDefault();

    Meteor.call('removeAddress', e.currentTarget.getAttribute("data-id"));
  }
};

Template.contacts.events = {
  'click .addContact': function(e, tpl) {
    e.preventDefault();

    Session.set("currentContact", null);
    var customer_id = e.currentTarget.getAttribute("data-id");

    var contactModal = {
      template: Template.editContact,
      title: "New Contact",
      buttons: {
        cancel: {
          class: 'btn-default',
          label: 'Cancel'
        },
        ok: {
          class: 'btn-success',
          label: 'Save Contact'
        }
      }
    };

    var modal = ReactiveModal.initDialog(contactModal);

    modal.buttons.ok.on('click', function(button) {

      var data = {
        customer: customer_id,
        firstName: $(modal.modalTarget).find('[name=contact_firstName]').val(),
        lastName: $(modal.modalTarget).find('[name=contact_lastName]').val(),
        position: $(modal.modalTarget).find('[name=contact_position]').val(),
        phone: $(modal.modalTarget).find('[name=contact_phone]').val(),
        mobile: $(modal.modalTarget).find('[name=contact_mobile]').val(),
        email: $(modal.modalTarget).find('[name=contact_email]').val()
      };

      Meteor.call("addContact", data);
      modal = null;
      contactModal = null;
    });

    modal.show();

  },
  'click .editContact': function(e, tpl) {
    e.preventDefault();

    var contact = tpl.data.contacts.collection.findOne({ _id: e.currentTarget.getAttribute("data-id") });
    Session.set("currentContact", contact);
    var customer_id = e.currentTarget.getAttribute("data-id");

    var contactModal = {
      template: Template.editContact,
      title: "Edit Contact",
      buttons: {
        cancel: {
          class: 'btn-default',
          label: 'Cancel'
        },
        ok: {
          class: 'btn-success',
          label: 'Save Contact'
        }
      }
    };

    var modal = ReactiveModal.initDialog(contactModal);

    modal.buttons.ok.on('click', function(button) {
      var data = {
        firstName: $(modal.modalTarget).find('[name=contact_firstName]').val(),
        lastName: $(modal.modalTarget).find('[name=contact_lastName]').val(),
        position: $(modal.modalTarget).find('[name=contact_position]').val(),
        phone: $(modal.modalTarget).find('[name=contact_phone]').val(),
        mobile: $(modal.modalTarget).find('[name=contact_mobile]').val(),
        email: $(modal.modalTarget).find('[name=contact_email]').val()
      };
      
      Meteor.call("updateContact", contact._id, data);
    });

    modal.show();

  },
  'click .deleteContact': function(e, tpl) {
    e.preventDefault();

    Meteor.call('removeContact', e.currentTarget.getAttribute("data-id"));
  }
};

Template.notes.events = {
  'click .addNote': function(e, tpl) {
    e.preventDefault();

    Session.set("currentNote", null);
    var customer_id = e.currentTarget.getAttribute("data-id");

    var noteModal = {
      template: Template.editNote,
      title: "New Note",
      buttons: {
        cancel: {
          class: 'btn-default',
          label: 'Cancel'
        },
        ok: {
          class: 'btn-success',
          label: 'Save Note'
        }
      }
    };

    var modal = ReactiveModal.initDialog(noteModal);

    modal.buttons.ok.on('click', function(button) {

      var data = {
        customer: customer_id,
        title: $(modal.modalTarget).find('[name=note_title]').val(),
        note: $(modal.modalTarget).find('[name=note_text]').val()
      };

      Meteor.call("addNote", data);
      modal = null;
      noteModal = null;
    });

    modal.show();

  },
  'click .editNote': function(e, tpl) {
    e.preventDefault();

    var note = tpl.data.notes.collection.findOne({ _id: e.currentTarget.getAttribute("data-id") });
    Session.set("currentNote", note);
    var customer_id = e.currentTarget.getAttribute("data-id");

    var noteModal = {
      template: Template.editNote,
      title: "Edit Note",
      buttons: {
        cancel: {
          class: 'btn-default',
          label: 'Cancel'
        },
        ok: {
          class: 'btn-success',
          label: 'Save Note'
        }
      }
    };

    var modal = ReactiveModal.initDialog(noteModal);

    modal.buttons.ok.on('click', function(button) {
      var data = {
        title: $(modal.modalTarget).find('[name=note_title]').val(),
        note: $(modal.modalTarget).find('[name=note_text]').val()
      };
      
      Meteor.call("updateNote", note._id, data);
    });

    modal.show();

  },
  'click .deleteNote': function(e, tpl) {
    e.preventDefault();

    Meteor.call('removeNote', e.currentTarget.getAttribute("data-id"));
  }
};