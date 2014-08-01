// in order to see the app running inside the QUnit runner
App.rootElement = '#ember-testing';

// Common test setup
App.setupForTesting();
App.injectTestHelpers();

// common QUnit module declaration
module("Integration tests", {
  setup: function() {
    // before each test, ensure the application is ready to run.
    Ember.run(App, App.advanceReadiness);
  },

  teardown: function() {
    // reset the application state between each test
    App.reset();
  }
});

test("/customers/new", function() {
  expect(0);

  var name = "QUnit";
  var tags = "A,B,C";

  test("/customers/new", function() {
    visit("/customers/new");

    andThen(function() {
      equal(find("h1").text(), "New Customer", "New Customer header is rendered");
      
      fillIn("#customer_name", name);
      fillIn("#customer_tags", tags);
      click("#saveCustomer");

      andThen(function() {
        equal(currentRouteName(), "customer")
        equal(find("h1.page-header").text(), name, "Header was set");
        equal(find("#customer_name").val(), name, "Name was set");
        equal(find("#customer_tags").val(), tags, "Tags were set");
      });
    });

  });

  test("/", function() {
    visit("/");

    andThen(function() {
      equal(find("h1").text(), "Dashboard", "Dashboard header is rendered");
      notEqual(find("tr").length, 1, "There is more than one table row");
      notEqual(find(".btn").length, 2, "There are tag buttons");
    });
  });

  test("/customers/", function() {
    visit("/customers");

    andThen(function() {
      equal(find("h1").text(), "Customers", "Customers header is rendered");
      equal(find("table tbody tr:last td:nth-child(2)").text(), name, "Name is rendered");
      equal(find("table tbody tr:last td:nth-child(4)").text(), tags.split(',').join(', '), "Tags are rendered");

      click(find("table tbody tr:last td:last button"));

      andThen(function() {     
        notEqual(find("table tbody tr:last td:nth-child(2)").text(), name, "Row was successfully removed");
      });

    });

  });
});