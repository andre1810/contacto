ContactoApp.module("CustomersApp.List", function(List, ContactoApp, Backbone, Marionette, $, _) {
  List.Controller = {
    listCustomers: function(key) {

      var fetchingCustomers;

      if (key === undefined) {
        fetchingCustomers = ContactoApp.request("customer:entities");
      }
      else {
        fetchingCustomers = ContactoApp.request("customer:entities:by_key", key);
      }
  
      $.when(fetchingCustomers).done(function(customers) { 
        var customersLayout = new List.Customers({ collection: customers });

        customersLayout.on("childview:customer:delete", function(args) {
          args.model.destroy();
        });

        ContactoApp.mainRegion.show(customersLayout);
      });
      
    },
    searchCustomers: function(keyword) {

      var fetchingCustomers = ContactoApp.request("customer:entities:by_keyword", keyword);

      $.when(fetchingCustomers).done(function(customers) { 
        var searchResultModel = new ContactoApp.Entities.SearchResult({ keyword: keyword, customersFound: customers.length });
        var searchResultLayout = new List.CustomerSearchResult({ model: searchResultModel, collection: customers });

        ContactoApp.mainRegion.show(searchResultLayout);
      });
      
    }
  };
});