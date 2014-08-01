ContactoApp.module("CustomerApp.Edit", function(Edit, ContactoApp, Backbone, Marionette, $, _){
  Edit.CustomerLayout = Backbone.Marionette.LayoutView.extend({
    template: "#customer-layout",

    regions: {
      customerRegion: "#customer-region",
      addressesRegion: "#addresses-region",
      contactsRegion: "#contacts-region",
      notesRegion: "#notes-region"
    }
  });

  Edit.Customer = Backbone.Marionette.ItemView.extend({
    template: "#customer",

    ui: {
      button: "button.save-customer"
    },

    events: {
      "click button.save-customer": "formSubmitted"
    },

    formSubmitted: function(e) {
      e.preventDefault();

      var data = Backbone.Syphon.serialize(this, { exclude: ["tags"] });

      // set tags
      var tags = $("input[name='tags']").val();

      if (tags.length > 0) {
        tags = tags.split(',');
        this.model.set("tags", tags);
      }
      else {
        this.model.set("tags", null);
      }
      
      this.model.set(data);
      this.model.save({}, {
        success: function() {
          $("button.save-customer").addClass("btn-success");

          setTimeout(function() {
            $("button.save-customer").removeClass("btn-success");
          }, 2000);
        },
        error: function() {
          $("button.save-customer").addClass("btn-danger");

          setTimeout(function() {
            $("button.save-customer").removeClass("btn-danger");
          }, 2000);
        },
      });
    },

    onShow: function() {
      var selectValue = this.model.get("branch");
      $("#inputBranch option[value='" + selectValue + "']").attr("selected", "selected");

      $("input[name='tags']").selectize({
        persist: false,
        create: function(input) {
          return {
            value: input,
            text: input
          }
        }
      });
    }
  });

  Edit.Address = Backbone.Marionette.ItemView.extend({
    tagName: "tr",
    template: "#address",

    triggers: {
      "click button.edit-address": "address:edit",
      "click button.delete-address": "address:delete"
    },

    remove: function() {
      var self = this;
      this.$el.fadeOut(function() {
        Marionette.ItemView.prototype.remove.call(self);
      });
    }
  });

  Edit.NoAdressView = Backbone.Marionette.ItemView.extend({
    tagName: "tr",
    template: "#no-address"
  });

  Edit.Addresses = Backbone.Marionette.CompositeView.extend({
    template: "#addresses-view",
    emptyView: Edit.NoAdressView,
    childView: Edit.Address,
    childViewContainer: "tbody",

    triggers: {
      "click button.new-address": "address:new"
    }
  });

  Edit.Contact = Backbone.Marionette.ItemView.extend({
    template: "#contact",

    triggers: {
      "click button.edit-contact": "contact:edit",
      "click button.delete-contact": "contact:delete"
    },

    remove: function() {
      var self = this;
      this.$el.fadeOut(function() {
        Marionette.ItemView.prototype.remove.call(self);
      });
    }
  });

  Edit.NoContactView = Backbone.Marionette.ItemView.extend({
    template: "#no-contact", 
    class: "no-item-container"
  });

  Edit.Contacts = Backbone.Marionette.CompositeView.extend({
    template: "#contacts-view",
    emptyView: Edit.NoContactView,
    childView: Edit.Contact,
    childViewContainer: "#contacts-container",

    triggers: {
      "click button.new-contact": "contact:new"
    }
  });

  Edit.Note = Backbone.Marionette.ItemView.extend({
    template: "#note",

    triggers: {
      "click button.edit-note": "note:edit",
      "click button.delete-note": "note:delete"
    },

    remove: function() {
      var self = this;
      this.$el.fadeOut(function() {
        Marionette.ItemView.prototype.remove.call(self);
      });
    }
  });

  Edit.NoNoteView = Backbone.Marionette.ItemView.extend({
    template: "#no-note", 
    class: "no-item-container"
  });

  Edit.Notes = Backbone.Marionette.CompositeView.extend({
    template: "#notes-view",
    emptyView: Edit.NoNoteView,
    childView: Edit.Note,
    childViewContainer: "#notes-container",

    triggers: {
      "click button.new-note": "note:new"
    }
  });

  Edit.AddressModal = Backbone.Marionette.ItemView.extend({
    template: "#address-modal"
  });

  Edit.ContactModal = Backbone.Marionette.ItemView.extend({
    template: "#contact-modal"
  });

  Edit.NoteModal = Backbone.Marionette.ItemView.extend({
    template: "#note-modal"
  });
});