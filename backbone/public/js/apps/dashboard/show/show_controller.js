ContactoApp.module("DashboardApp.Show", function(Show, ContactoApp, Backbone, Marionette, $, _) {
  Show.Controller = {
    showDashboard: function() {

      var fetchingCustomers = ContactoApp.request("customer:entities_new");
      var fetchingTotalCustomers = ContactoApp.request("customer:total");
      var fetchingTotalNewCustomers = ContactoApp.request("customer:total_new");
      var fetchingTags = ContactoApp.request("tags:entities");
  
      var dashboardLayout = new Show.Layout();
      var dashboard = new Show.Dashboard();
      var tags = new Show.Tags();

      dashboardLayout.on("show", function() {
        dashboardLayout.dashboardRegion.show(dashboard);

        $.when(fetchingTotalCustomers).done(function(result) {   
          dashboard.ui.total_customers.html(result.count);
        });

        $.when(fetchingTotalNewCustomers).done(function(result) { 
          dashboard.ui.total_new_customers.html(result);
        });

        $.when(fetchingCustomers).done(function(customers) {
          var newCustomersView = new Show.NewCustomers({ collection: customers });
          dashboardLayout.newCustomersRegion.show(newCustomersView);
        });

        $.when(fetchingTags).done(function(tags) {
          var tagsView = new Show.Tags({ collection: tags });
          dashboardLayout.tagsRegion.show(tagsView);
        });
      });

      ContactoApp.mainRegion.show(dashboardLayout);
    }
  };
});