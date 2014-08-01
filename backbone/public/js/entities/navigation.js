ContactoApp.module("Entities", function(Entities, ContactoApp, Backbone, Marionette, $, _){
  Entities.Navigation = Backbone.Model.extend({
    initialize: function(){
      var selectable = new Backbone.Picky.Selectable(this);
      _.extend(this, selectable);
    }
  });

  Entities.NavigationCollection = Backbone.Collection.extend({
    model: Entities.Navigation,

    initialize: function(){
      var singleSelect = new Backbone.Picky.SingleSelect(this);
      _.extend(this, singleSelect);
    }
  });

  var initializeItems = function(){
    Entities.navigationItems = new Entities.NavigationCollection([
      { name: "Dashboard", url: "dashboard", navigationTrigger: "dashboard:show" },
      { name: "Customers", url: "customers", navigationTrigger: "customers:list" },
      { name: "New Customer", url: "customer/new", navigationTrigger: "customer:new" },
    ]);
  };

  var API = {
    getItems: function(){
      if(Entities.navigationItems === undefined){
        initializeItems();
      }
      
      return Entities.navigationItems;
    }
  };

  ContactoApp.reqres.setHandler("navigation:entities", function(){
    return API.getItems();
  });
});