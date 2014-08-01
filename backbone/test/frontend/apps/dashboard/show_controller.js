'use strict';

describe('DashboardApp.Show.Controller', function() {

  it('should exist', function() {

    expect(ContactoApp.DashboardApp.Show.Controller).toBeDefined();

  });

  it('should get customers', function() {

  	spyOn(ContactoApp,"request");
  	spyOn(ContactoApp.mainRegion,"show");

  	ContactoApp.DashboardApp.Show.Controller.showDashboard();

    expect(ContactoApp.request).toHaveBeenCalled();
    expect(ContactoApp.request.callCount).toBe(4);
    expect(ContactoApp.mainRegion.show).toHaveBeenCalled();

  });

});