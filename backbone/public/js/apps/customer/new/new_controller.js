ContactoApp.module("CustomerApp.New", function(New, ContactoApp, Backbone, Marionette, $, _) {
  New.Controller = {
    newCustomer: function() {

      var customer = new ContactoApp.Entities.Customer();

      var customerLayout = new New.CustomerLayout({ model: customer });
      var customerView = new New.Customer({ model: customer });

      customerLayout.on("show", function() {
        customerLayout.customerRegion.show(customerView); 
      });

      ContactoApp.mainRegion.show(customerLayout);

    }
  };
});