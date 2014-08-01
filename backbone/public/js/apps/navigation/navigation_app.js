ContactoApp.module("NavigationApp", function(Navigation, ContactoApp, Backbone, Marionette, $, _){
  var API = {
    listNavigation: function(){
      Navigation.List.Controller.listNavigation();
    }
  };

  ContactoApp.commands.setHandler("set:active:navigation", function(name){
    ContactoApp.NavigationApp.List.Controller.setActiveNavigation(name);
  });

  Navigation.on("start", function(){
    API.listNavigation();
  });
});