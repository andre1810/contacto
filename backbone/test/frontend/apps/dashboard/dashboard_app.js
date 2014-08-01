'use strict';

describe('DashboardApp', function() {

  it('should exist', function() {

    expect(ContactoApp.DashboardApp).toBeDefined();

  });

  it('should have a router', function() {

    expect(ContactoApp.DashboardApp.Router).toBeDefined();

  });

  it('should show the dashboard when triggered', function() {

  	spyOn(ContactoApp,"navigate");
  	spyOn(ContactoApp,"execute");
  	spyOn(ContactoApp.DashboardApp.Show.Controller,"showDashboard");

  	ContactoApp.trigger("dashboard:show");

  	expect(ContactoApp.navigate).toHaveBeenCalled();
  	expect(ContactoApp.execute).toHaveBeenCalled();
    expect(ContactoApp.DashboardApp.Show.Controller.showDashboard).toHaveBeenCalled();

  });

});