ContactoApp.module("CustomerApp.Edit", function(Edit, ContactoApp, Backbone, Marionette, $, _) {
  Edit.Controller = {
    editCustomer: function(customerId) {

      var fetchingCustomer = ContactoApp.request("customer:entity:by_customer_id", customerId);

      $.when(fetchingCustomer).done(function(customer) { 

          var customerLayout = new Edit.CustomerLayout({ model: customer });
          var customerView = new Edit.Customer({ model: customer });

          customerLayout.on("show", function() {
            customerLayout.customerRegion.show(customerView); 

            var fetchingAddresses = ContactoApp.request("addresses:by_customer_id", customer.id);
            var fetchingContacts = ContactoApp.request("contacts:by_customer_id", customer.id);
            var fetchingNotes = ContactoApp.request("notes:by_customer_id", customer.id);

            $.when(fetchingAddresses).done(function(addresses) {            
              var addressesView = new Edit.Addresses({ collection: addresses });

              addressesView.on("childview:address:edit",function(childView, args) { 
                var view = new ContactoApp.CustomerApp.Edit.AddressModal({ model: args.model });

                view.on("show", function() {

                  var modal = bootbox.dialog({
                    title: function() {
                      return 'Address ' + view.model.get("label");
                    },
                    message: this.$el.html(),
                    buttons: {
                      "Save": {   
                        label: "Save",                    
                        className: "btn-success",                   
                        callback: function(e) {

                          // set view dom by modal dom
                          view.$el.html(modal.find("#address-form"));

                          // get data of form
                          var data = Backbone.Syphon.serialize(view);
                          
                          view.model.set(data);
                          view.model.save({}, {
                            success: function() {

                              // remove dialog view
                              ContactoApp.dialogRegion.empty();

                              // re-render the item view
                              childView.render();               
                            },
                            error: function() {}
                          });
                        }
                      },                
                      "Cancel": function() {
                        ContactoApp.dialogRegion.empty();
                      }
                    },
                    show: false
                  });

                  modal.modal("show");

                });

                ContactoApp.dialogRegion.show(view);
              });

              addressesView.on("address:new",function(args) { 
                var view = new ContactoApp.CustomerApp.Edit.AddressModal({ model: new ContactoApp.Entities.Address({ customer: customer.id }) });

                view.on("show", function() {

                  var modal = bootbox.dialog({
                    title: function() {
                      return 'New Address';
                    },
                    message: this.$el.html(),
                    buttons: {
                      "Save": {   
                        label: "Save",                    
                        className: "btn-success",                   
                        callback: function(e) {

                          // set view dom by modal dom
                          view.$el.html(modal.find("#address-form"));

                          // get data of form
                          var data = Backbone.Syphon.serialize(view);
                          
                          view.model.set(data);
                          view.model.save({}, {
                            success: function() {

                              // remove dialog view
                              ContactoApp.dialogRegion.empty();

                              addressesView.collection.push(view.model);
                              addressesView.render();        
                            },
                            error: function() {}
                          });
                        }
                      },                
                      "Cancel": function() {
                        ContactoApp.dialogRegion.empty();
                      }
                    },
                    show: false
                  });

                  modal.modal("show");

                });

                ContactoApp.dialogRegion.show(view);
              });

              addressesView.on("childview:address:delete", function(args) {
                args.model.destroy();
              });

              customerLayout.addressesRegion.show(addressesView);
            });        
   
            $.when(fetchingContacts).done(function(contacts) {
              var contactsView = new Edit.Contacts({ collection: contacts });

              contactsView.on("childview:contact:edit",function(childView, args) { 
                var view = new ContactoApp.CustomerApp.Edit.ContactModal({ model: args.model });

                view.on("show", function() {

                  var modal = bootbox.dialog({
                    title: function() {
                      return 'Contact ' + view.model.get("firstName") + ' ' + view.model.get("lastName");
                    },
                    message: this.$el.html(),
                    buttons: {
                      "Save": {   
                        label: "Save",                    
                        className: "btn-success",                   
                        callback: function(e) {

                          // set view dom by modal dom
                          view.$el.html(modal.find("#contact-form"));

                          // get data of form
                          var data = Backbone.Syphon.serialize(view);
                          
                          view.model.set(data);
                          view.model.save({}, {
                            success: function() {

                              // remove dialog view
                              ContactoApp.dialogRegion.empty();

                              // re-render the item view
                              childView.render();               
                            },
                            error: function() {}
                          });
                        }
                      },                
                      "Cancel": function() {
                        ContactoApp.dialogRegion.empty();
                      }
                    },
                    show: false
                  });

                  modal.modal("show");

                });

                ContactoApp.dialogRegion.show(view);
              });

              contactsView.on("contact:new",function(args) { 
                var view = new ContactoApp.CustomerApp.Edit.ContactModal({ model: new ContactoApp.Entities.Contact({ customer: customer.id }) });

                view.on("show", function() {

                  var modal = bootbox.dialog({
                    title: function() {
                      return 'New Contact';
                    },
                    message: this.$el.html(),
                    buttons: {
                      "Save": {   
                        label: "Save",                    
                        className: "btn-success",                   
                        callback: function(e) {

                          // set view dom by modal dom
                          view.$el.html(modal.find("#contact-form"));

                          // get data of form
                          var data = Backbone.Syphon.serialize(view);
                          
                          view.model.set(data);
                          view.model.save({}, {
                            success: function() {

                              // remove dialog view
                              ContactoApp.dialogRegion.empty();

                              contactsView.collection.push(view.model);
                              contactsView.render();        
                            },
                            error: function() {}
                          });
                        }
                      },                
                      "Cancel": function() {
                        ContactoApp.dialogRegion.empty();
                      }
                    },
                    show: false
                  });

                  modal.modal("show");

                });

                ContactoApp.dialogRegion.show(view);
              });

              contactsView.on("childview:contact:delete", function(args) {
                args.model.destroy();
              });

              customerLayout.contactsRegion.show(contactsView);
            });

            $.when(fetchingNotes).done(function(notes) {
              var notesView = new Edit.Notes({ collection: notes });

              notesView.on("childview:note:edit",function(childView, args) { 
                var view = new ContactoApp.CustomerApp.Edit.NoteModal({ model: args.model });

                view.on("show", function() {

                  var modal = bootbox.dialog({
                    title: function() {
                      return 'Note ' + view.model.get("title");
                    },
                    message: this.$el.html(),
                    buttons: {
                      "Save": {   
                        label: "Save",                    
                        className: "btn-success",                   
                        callback: function(e) {

                          // set view dom by modal dom
                          view.$el.html(modal.find("#note-form"));

                          // get data of form
                          var data = Backbone.Syphon.serialize(view);
                          
                          view.model.set(data);
                          view.model.save({}, {
                            success: function() {

                              // remove dialog view
                              ContactoApp.dialogRegion.empty();

                              // re-render the item view
                              childView.render();               
                            },
                            error: function() {}
                          });
                        }
                      },                
                      "Cancel": function() {
                        ContactoApp.dialogRegion.empty();
                      }
                    },
                    show: false
                  });

                  modal.modal("show");

                });

                ContactoApp.dialogRegion.show(view);
              });

              notesView.on("note:new",function(args) { 
                var view = new ContactoApp.CustomerApp.Edit.NoteModal({ model: new ContactoApp.Entities.Note({ customer: customer.id }) });

                view.on("show", function() {

                  var modal = bootbox.dialog({
                    title: function() {
                      return 'New Note';
                    },
                    message: this.$el.html(),
                    buttons: {
                      "Save": {   
                        label: "Save",                    
                        className: "btn-success",                   
                        callback: function(e) {

                          // set view dom by modal dom
                          view.$el.html(modal.find("#note-form"));

                          // get data of form
                          var data = Backbone.Syphon.serialize(view);
                          
                          view.model.set(data);
                          view.model.save({}, {
                            success: function() {

                              // remove dialog view
                              ContactoApp.dialogRegion.empty();

                              notesView.collection.push(view.model);
                              notesView.render();        
                            },
                            error: function() {}
                          });
                        }
                      },                
                      "Cancel": function() {
                        ContactoApp.dialogRegion.empty();
                      }
                    },
                    show: false
                  });

                  modal.modal("show");

                });

                ContactoApp.dialogRegion.show(view);
              });

              notesView.on("childview:note:delete", function(args) {
                args.model.destroy();
              });

              customerLayout.notesRegion.show(notesView);
            });

          });

          ContactoApp.mainRegion.show(customerLayout);
        });
      
    }
  };
});