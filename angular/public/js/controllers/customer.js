'use strict';

angular.module('contactoApp')
  .controller('CustomerCtrl', function ($rootScope, $scope, $http, $routeParams, $modal, _, Customer, CustomerService, Address, Contact, Note) {

    $scope.error = null;

    var customerId = $routeParams.customerId;

    $scope.customer = null;
    $scope.tags = null;

    $scope.addresses = null;
    $scope.contacts = null;
    $scope.notes = null;

    if (customerId != "") {
      CustomerService.getCustomerByCustomerId(customerId, function(customer) {

        if (customer._id == null) {
          $scope.customer = {};
          $scope.customer.name = "Customer " + customerId;
          $scope.error = "Can not load customer.";
        }
        else {
          $scope.customer = new Customer(customer); 
          $scope.tags = $scope.customer.tags.join(',');    
          $scope.getAddresses();
          $scope.getContacts();  
          $scope.getNotes();  
        }

      });
    }

    $scope.getAddresses = function() {

      CustomerService.getCustomerAddresses($scope.customer._id, function(addresses) {
        $scope.addresses = addresses;
      }); 

    };

    $scope.getContacts = function() {

      CustomerService.getCustomerContacts($scope.customer._id, function(contacts) {
        $scope.contacts = contacts;
      }); 

    };

    $scope.getNotes = function() {

      CustomerService.getCustomerNotes($scope.customer._id, function(notes) {
        $scope.notes = notes;
      }); 

    };

    $scope.setTags = function() {  

      if ($scope.tags != null) {
        var tags = [];

        angular.forEach($scope.tags.split(","), function(value) {

          if(value.trim() != "") {
            this.push(value.trim());
          }

        }, tags);

        $scope.customer.tags = tags;
      }
      else {
        $scope.customer.tags = null;
      }

    };

    $scope.saveCustomer = function() {
      
      $scope.setTags(); 
           
      var customer = new Customer($scope.customer);

      customer.$update(function(customer, putResponseHeaders) {
        $scope.error = "";
       }, function(err) {
        $scope.error = "An error occurred while processing your request."
       });

    };

    // Address Modal

    $scope.addressModal = function(customerId, addressId) {

      var modalInstance = $modal.open({
        templateUrl: 'partials/modals/address.html',
        controller: AddressModalInstanceCtrl,
        size: 'lg',
        resolve: {
          customerId: function() {
            return customerId;
          },
          addressId: function() {
            return addressId;
          }
        }
      });

      modalInstance.result.then(function(newAddress) {
        
        var addressUpdated = false;

        // Update edited address
        angular.forEach($scope.addresses, function(address, key) {
          if (address._id === newAddress._id) {
            $scope.addresses[key] = newAddress;
            addressUpdated = true;
          }
        });

        // Add new address to collection
        if (!addressUpdated) {
          $scope.addresses.push(newAddress);
        }

      });
    };

    $scope.addAddress = function() {
      $scope.addressModal($scope.customer._id, null);
    };

    $scope.editAddress = function(address) {
      $scope.addressModal($scope.customer._id, address._id);
    };

    $scope.deleteAddress = function(address) {
      $scope.addresses = _.without($scope.addresses, address);   
      address = new Address(address);
      address.$remove();      
    };

    // Contact Modal

    $scope.contactModal = function(customerId, contactId) {

      var modalInstance = $modal.open({
        templateUrl: 'partials/modals/contact.html',
        controller: ContactModalInstanceCtrl,
        size: 'lg',
        resolve: {
          customerId: function() {
            return customerId;
          },
          contactId: function() {
            return contactId;
          }
        }
      });

      modalInstance.result.then(function(newContact) {
        
        var contactUpdated = false;

        // Update edited contact
        angular.forEach($scope.contacts, function(contact, key) {
          if (contact._id === newContact._id) {
            $scope.contacts[key] = newContact;
            contactUpdated = true;
          }
        });

        // Add new contact to collection
        if (!contactUpdated) {
          $scope.contacts.push(newContact);
        }

      });
    };

    $scope.addContact = function() {
      $scope.contactModal($scope.customer._id, null);
    };

    $scope.editContact = function(contact) {
      $scope.contactModal($scope.customer._id, contact._id);
    };

    $scope.deleteContact = function(contact) {
      $scope.contacts = _.without($scope.contacts, contact);   
      contact = new Contact(contact);
      contact.$remove();      
    };

    // Note Modal

    $scope.noteModal = function(customerId, noteId) {

      var modalInstance = $modal.open({
        templateUrl: 'partials/modals/note.html',
        controller: NoteModalInstanceCtrl,
        size: 'lg',
        resolve: {
          customerId: function() {
            return customerId;
          },
          noteId: function() {
            return noteId;
          }
        }
      });

      modalInstance.result.then(function(newNote) {
        
        var noteUpdated = false;

        // Update edited note
        angular.forEach($scope.notes, function(note, key) {
          if (note._id === newNote._id) {
            $scope.notes[key] = newNote;
            noteUpdated = true;
          }
        });

        // Add new note to collection
        if (!noteUpdated) {
          $scope.notes.push(newNote);
        }

      });
    };

    $scope.addNote = function() {
      $scope.noteModal($scope.customer._id, null);
    };

    $scope.editNote = function(note) {
      $scope.noteModal($scope.customer._id, note._id);
    };

    $scope.deleteNote = function(note) {
      $scope.notes = _.without($scope.notes, note);   
      note = new Note(note);
      note.$remove();      
    };
    
  });