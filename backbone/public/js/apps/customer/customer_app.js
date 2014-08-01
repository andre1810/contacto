ContactoApp.module("CustomerApp", function(CustomerApp, ContactoApp, Backbone, Marionette, $, _){
  CustomerApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "customer/new": "newCustomer",
      "customer/:id": "editCustomer"
    }
  });

  var API = {
    editCustomer: function(id) {
      CustomerApp.Edit.Controller.editCustomer(id);
      ContactoApp.execute("set:active:navigation", "customers");
    },
    newCustomer: function() {
      CustomerApp.New.Controller.newCustomer();
      ContactoApp.execute("set:active:navigation", "customer/new");
    }
  };

  ContactoApp.on("customer:edit", function(id) {
    ContactoApp.navigate("customer/" + id);
    API.editCustomer(id);
  });

  ContactoApp.on("customer:new", function() {
    ContactoApp.navigate("customer/new");
    API.newCustomer();
  });

  ContactoApp.addInitializer(function() {
    new CustomerApp.Router({
      controller: API
    });
  });
});