'use strict';

describe('Customer', function() {

  it('should exist', function() {

    expect(ContactoApp.Entities.Customer).toBeDefined();
    expect(ContactoApp.Entities.CustomerCollection).toBeDefined();

  });

  describe("url", function() {
    var customer;
    var collection;

    beforeEach(function() {
      customer = new ContactoApp.Entities.Customer( { _id: 1 });
      collection = new ContactoApp.Entities.CustomerCollection();
    });

    describe("when no id is set", function() {
      it("should return the collection URL", function() {
        expect(collection.url).toEqual("customers");
      });
    });

    describe("when id is set", function() {
      it("should return the collection URL and id", function() {
        expect(customer.url()).toEqual("customers/1");
      });
    });
  });

});