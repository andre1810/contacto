ContactoApp.module("DashboardApp.Show", function(Show, ContactoApp, Backbone, Marionette, $, _){
  Show.Layout = Backbone.Marionette.LayoutView.extend({
    template: "#dashboard-layout",

    regions: {
      dashboardRegion: "#dashboard-region",
      newCustomersRegion: "#new-customers-region",
      tagsRegion: "#tags-region"
    }
  });

  Show.Dashboard = Backbone.Marionette.ItemView.extend({
    template: "#dashboard-view",

    ui: {
      total_customers: "#total-customers",
      total_new_customers: "#total-new-customers",
    },
  });

  Show.NewCustomer = Backbone.Marionette.ItemView.extend({
    tagName: "tr",
    template: "#new-customer-row"
  });

  Show.NoNewCustomersView = Backbone.Marionette.ItemView.extend({
    tagName: "div",
    template: "#empty-new-customer-row"
  });

  Show.NewCustomers = Backbone.Marionette.CompositeView.extend({
    template: "#new-customers-view",
    emptyView: Show.NoNewCustomersView,
    childView: Show.NewCustomer,
    childViewContainer: "tbody"
  });

  Show.Tag = Backbone.Marionette.ItemView.extend({
    tagName: "span",
    template: "#tag"
  });

  Show.NoTagsView = Backbone.Marionette.ItemView.extend({
    template: "#no-tags"
  });

  Show.Tags = Backbone.Marionette.CompositeView.extend({
    template: "#tags-view",
    emptyView: Show.NoTagsView,
    childView: Show.Tag,
    childViewContainer: "#tags",

    ui: {
      tag_count: "#tag-count"
    },

    onRender: function() {
      this.ui.tag_count.html(this.collection.length);
    }
  });
});