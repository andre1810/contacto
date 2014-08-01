'use strict';

describe('CustomerApp.Edit.Controller', function() {

  it('should exist', function() {

    expect(ContactoApp.CustomerApp.Edit.Controller).toBeDefined();

  });

  it('should get customer', function() {

  	spyOn(ContactoApp,"request");
  	spyOn(ContactoApp.mainRegion,"show");

  	ContactoApp.CustomerApp.Edit.Controller.editCustomer(1);

    expect(ContactoApp.request).toHaveBeenCalledWith("customer:entity:by_customer_id",1);
    expect(ContactoApp.request.callCount).toBe(1);
    expect(ContactoApp.mainRegion.show).toHaveBeenCalled();

  });

});