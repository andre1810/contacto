ContactoApp.module("NavigationApp.List", function(List, ContactoApp, Backbone, Marionette, $, _) {
  List.Navigation = Marionette.ItemView.extend({
    template: "#navigation-item",
    tagName: "li",

    events: {
      "click a": "navigate"
    },

    navigate: function(e) {
      e.preventDefault();
      this.trigger("navigate", this.model);
    },

    onRender: function() {
      if (this.model.selected) {
        // add class so Bootstrap will highlight the active entry in the navbar
        this.$el.addClass("active");
      };
    }
  });

  List.Navigations = Marionette.CompositeView.extend({
    template: "#navigation",
    tagName: "ul",
    className: "nav nav-sidebar",
    childView: List.Navigation
  });
});