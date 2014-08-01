ContactoApp.module("SearchApp", function(Search, ContactoApp, Backbone, Marionette, $, _) {
  var API = {
    showSearchBar: function(){
      Search.Search.Controller.showSearchBar();
    }
  };

  Search.on("start", function(){
    API.showSearchBar();
  });
});