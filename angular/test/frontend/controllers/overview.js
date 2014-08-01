'use strict';

describe('Controller: OverviewCrtl', function () {

  beforeEach(module('contactoApp'));

  var $httpBackend, $rootScope, createController, newCustomers;
 
  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');

    newCustomers = [];

    var tags = [];

    $httpBackend.when('GET', '/customers/recently_added').respond(newCustomers);
    $httpBackend.when('GET', '/customers/count').respond(0);
    $httpBackend.when('GET', '/customers/tags').respond(tags);

    $rootScope = $injector.get('$rootScope');

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('OverviewCtrl', {'$scope' : $rootScope });
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should get total customers', inject(function (CustomerService) {
    spyOn(CustomerService, 'getTotalCustomers').andCallThrough();

    var controller = createController();
    $httpBackend.flush();

    expect(CustomerService.getTotalCustomers).toHaveBeenCalled();
  }));

  it('should get recently added customers', inject(function (CustomerService) {
    spyOn(CustomerService, 'getRecentlyAddedCustomers').andCallThrough();

    var controller = createController();
    $httpBackend.flush();

    expect(CustomerService.getRecentlyAddedCustomers).toHaveBeenCalled();
  }));

  it('should get tags', inject(function (CustomerService) {
    spyOn(CustomerService, 'getTags').andCallThrough();

    var controller = createController();
    $httpBackend.flush();

    expect(CustomerService.getTags).toHaveBeenCalled();
  }));
});
