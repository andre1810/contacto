ContactoApp.module("SearchApp.Search", function(Search, ContactoApp, Backbone, Marionette, $, _) {
  Search.Controller = {
    showSearchBar: function() {

      var searchBar = new Search.Bar();

      searchBar.on("customers:search", function(keyword) {
      	ContactoApp.navigate("customers/search/" + keyword, true);
      });

      ContactoApp.searchRegion.show(searchBar); 

    }
  };
});