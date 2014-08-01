'use strict';

describe('Controller: NewCustomerCrtl', function () {

  beforeEach(module('contactoApp'));

  var $httpBackend, $rootScope, $location, createController, controller, newCustomers;
 
  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('POST', '/customers').respond({ _id: 1, customerId: 1});

    $rootScope = $injector.get('$rootScope');
    $location = $injector.get('$location');

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('NewCustomerCtrl', {'$scope' : $rootScope });
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have an error field', inject(function (CustomerService) {
    controller = createController();
    expect($rootScope.error).toBeDefined();
  }));

  it('should have a customer', inject(function (CustomerService) {
    controller = createController();
    expect($rootScope.customer).toBeDefined();
  }));

  it('should have tags', inject(function (CustomerService) {
    controller = createController();
    expect($rootScope.tags).toBeDefined();
  }));

  it('should set tags', inject(function (CustomerService) {
    controller = createController();

    $rootScope.customer = {
      tags: null
    };

    $rootScope.tags = "JavaScript,Node.js";

    $rootScope.setTags();
    expect($rootScope.customer.tags).not.toBe(null);
    expect($rootScope.customer.tags.length).toBe(2);
    expect($rootScope.customer.tags[0]).toBe("JavaScript");
    expect($rootScope.customer.tags[1]).toBe("Node.js");
  }));

  it('should save', function() {
    controller = createController();

    $rootScope.saveCustomer();
    $httpBackend.expectPOST('/customers');
    $httpBackend.flush();  
  });

  it('should redirect to customer page on save', function() {
    controller = createController();

    $rootScope.saveCustomer();
    $httpBackend.flush();

    expect($location.path()).toBe('/customer/1');
  });   

  it('should show error on failed save', function() {
    controller = createController();

    $rootScope.saveCustomer()
    $httpBackend.expectPOST('/customers').respond(400);
    $httpBackend.flush();

    expect($rootScope.error).not.toBe(null);
    expect($location.path()).toBe('');
  });      

});
