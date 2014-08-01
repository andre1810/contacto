ContactoApp.module("NavigationApp.List", function(List, ContactoApp, Backbone, Marionette, $, _){
  List.Controller = {
    listNavigation: function(){
      var items = ContactoApp.request("navigation:entities");
      var navigationItems = new List.Navigations({ collection: items });

      navigationItems.on("childview:navigate", function(childView, model) {
        var trigger = model.get("navigationTrigger");
        ContactoApp.trigger(trigger);
      });

      ContactoApp.navigationRegion.show(navigationItems);
    },

    setActiveNavigation: function(navigationUrl) {
      var items = ContactoApp.request("navigation:entities");
      var itemToSelect = items.find(function(item) { return item.get("url") === navigationUrl; });
      itemToSelect.select();
      items.trigger("reset");
    }
  };
});