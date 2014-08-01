ContactoApp.module("CustomersApp", function(CustomersApp, ContactoApp, Backbone, Marionette, $, _){
  CustomersApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "customers": "listCustomers",
      "customers/:key": "listCustomersByKey",
      "customers/search/:keyword": "searchCustomersByKeyword"
    }
  });

  var API = {
    listCustomers: function() {
      CustomersApp.List.Controller.listCustomers();
      ContactoApp.execute("set:active:navigation", "customers");
    },
    listCustomersByKey: function(key) {
      CustomersApp.List.Controller.listCustomers(key);
      ContactoApp.execute("set:active:navigation", "customers");
    },
    searchCustomersByKeyword: function(keyword) {
      CustomersApp.List.Controller.searchCustomers(keyword);
      ContactoApp.execute("set:active:navigation", "customers");
    }
  };

  ContactoApp.on("customers:list", function() {
    ContactoApp.navigate("customers");
    API.listCustomers();
  });

  ContactoApp.on("customers:search", function(keyword) {
    ContactoApp.navigate("customers/search/" + keyword);
    API.searchCustomersByKeyword(keyword);
  });

  ContactoApp.addInitializer(function() {
    new CustomersApp.Router({
      controller: API
    });
  });
});