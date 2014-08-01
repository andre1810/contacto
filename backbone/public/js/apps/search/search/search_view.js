ContactoApp.module("SearchApp.Search", function(Search, ContactoApp, Backbone, Marionette, $, _) {
  Search.Bar = Marionette.ItemView.extend({
    template: "#search-bar",
    className: "navbar-collapse collapse",
    tagName: "div",

    ui: {
      "searchField": "#search-field"
    },

    events: {
      "keyup #search-field" : "keyPressEventHandler"
    },

    keyPressEventHandler : function(e) {
      if (this.ui.searchField.val().length > 0 && e.keyCode == 13) {
        this.trigger("customers:search", this.ui.searchField.val());
      }
    }
  });
});