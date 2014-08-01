'use strict';

describe('CustomerApp.New.Controller', function() {

  it('should exist', function() {

    expect(ContactoApp.CustomerApp.New.Controller).toBeDefined();

  });

  it('should get customer', function() {

  	spyOn(ContactoApp,"request");
  	spyOn(ContactoApp.mainRegion,"show");

  	ContactoApp.CustomerApp.New.Controller.newCustomer();
    
    expect(ContactoApp.mainRegion.show).toHaveBeenCalled();

  });

});