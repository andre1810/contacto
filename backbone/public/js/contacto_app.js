var ContactoApp = new Backbone.Marionette.Application();

ContactoApp.addRegions({
  searchRegion: '#search-region',
  navigationRegion: '#navigation-region',
  mainRegion: '#main-region',
  dialogRegion: '#dialog-region'
});

ContactoApp.navigate = function(route, options) {
  options || (options = {});
  Backbone.history.navigate(route, options);
};

ContactoApp.getCurrentRoute = function() {
  return Backbone.history.fragment;
};

ContactoApp.on("start", function(options){
  if (Backbone.history) {
    Backbone.history.start();
  }

  if(this.getCurrentRoute() === "") {
    ContactoApp.trigger("dashboard:show");
  }
});