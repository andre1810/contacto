ContactoApp.module("CustomersApp.List", function(List, ContactoApp, Backbone, Marionette, $, _){
  List.Customer = Backbone.Marionette.ItemView.extend({
    tagName: "tr",
    template: "#customer-row",

    triggers: {
      "click button.delete-customer": "customer:delete"
    },

    remove: function() {
      var self = this;
      this.$el.fadeOut(function() {
        Marionette.ItemView.prototype.remove.call(self);
      });
    }
  });

  List.NoCustomer = Backbone.Marionette.ItemView.extend({
    tagName: "div",
    template: "#no-customer-row"
  });

  List.Customers = Backbone.Marionette.CompositeView.extend({
    template: "#customers-view",
    emptyView: List.NoCustomer,
    childView: List.Customer,
    childViewContainer: "tbody",
  });

  List.Customer = Backbone.Marionette.ItemView.extend({
    tagName: "tr",
    template: "#customer-row",

    triggers: {
      "click button.delete-customer": "customer:delete"
    },

    remove: function() {
      var self = this;
      this.$el.fadeOut(function() {
        Marionette.ItemView.prototype.remove.call(self);
      });
    }
  });

  List.CustomerSearchResult = Backbone.Marionette.CompositeView.extend({
    template: "#customer-search-result-view",
    emptyView: List.NoCustomer,
    childView: List.Customer,
    childViewContainer: "tbody"
  });
});