ContactoApp.module("CustomerApp.New", function(New, ContactoApp, Backbone, Marionette, $, _){
  New.CustomerLayout = Backbone.Marionette.LayoutView.extend({
    template: "#new-customer-layout",

    regions: {
      customerRegion: "#customer-region"
    }
  });

  New.Customer = Backbone.Marionette.ItemView.extend({
    template: "#customer",

    ui: {
      button: "button.save-customer"
    },

    events: {
      "click button.save-customer": "formSubmitted"
    },

    formSubmitted: function(e) {
      e.preventDefault();

      var data = Backbone.Syphon.serialize(this, { exclude: ["tags"] });

      // set tags
      var tags = $("input[name='tags']").val();

      if (tags.length > 0) {
        tags = tags.split(',');
        this.model.set("tags", tags);
      }
      else {
        this.model.set("tags", null);
      }
      
      this.model.set(data);
      this.model.save({}, {
        success: function(model) {

          ContactoApp.navigate("customer/" + model.get("customerId"), true);

        },
        error: function() {
          $("button.save-customer").addClass("btn-danger");

          setTimeout(function() {
            $("button.save-customer").removeClass("btn-danger");
          }, 2000);
        },
      });
    },

    onShow: function() {
      var selectValue = this.model.get("branch");
      $("#inputBranch option[value='" + selectValue + "']").attr("selected", "selected");

      $("input[name='tags']").selectize({
        persist: false,
        create: function(input) {
          return {
            value: input,
            text: input
          }
        }
      });
    }
  });
});