'use strict';

describe('CustomerApp', function() {

  it('should exist', function() {

    expect(ContactoApp.CustomerApp).toBeDefined();

  });

  it('should have a router', function() {

    expect(ContactoApp.CustomerApp.Router).toBeDefined();

  });

  it('should go to new customer when triggered', function() {

  	spyOn(ContactoApp,"navigate");
  	spyOn(ContactoApp,"execute");
  	spyOn(ContactoApp.CustomerApp.New.Controller,"newCustomer");

  	ContactoApp.trigger("customer:new");

  	expect(ContactoApp.navigate).toHaveBeenCalledWith("customer/new");
  	expect(ContactoApp.execute).toHaveBeenCalledWith("set:active:navigation","customer/new");
    expect(ContactoApp.CustomerApp.New.Controller.newCustomer).toHaveBeenCalled();

  });

  it('should go to edit customer when triggered', function() {

    var id = 10000;
    spyOn(ContactoApp,"navigate");
    spyOn(ContactoApp,"execute");
    spyOn(ContactoApp.CustomerApp.Edit.Controller,"editCustomer");

    ContactoApp.trigger("customer:edit",id);

    expect(ContactoApp.navigate).toHaveBeenCalledWith("customer/" + id);
    expect(ContactoApp.execute).toHaveBeenCalledWith("set:active:navigation","customers");
    expect(ContactoApp.CustomerApp.Edit.Controller.editCustomer).toHaveBeenCalledWith(id);

  });

});