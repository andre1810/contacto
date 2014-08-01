ContactoApp.module("DashboardApp", function(DashboardApp, ContactoApp, Backbone, Marionette, $, _){
  DashboardApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "dashboard": "showDashboard",
    }
  });

  var API = {
    showDashboard: function() {
      DashboardApp.Show.Controller.showDashboard();
      ContactoApp.execute("set:active:navigation", "dashboard");
    }
  };

  ContactoApp.on("dashboard:show", function() {
    ContactoApp.navigate("dashboard");
    API.showDashboard();
  });

  ContactoApp.addInitializer(function() {
    new DashboardApp.Router({
      controller: API
    });
  });
});