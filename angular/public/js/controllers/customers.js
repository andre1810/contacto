'use strict';

angular.module('contactoApp')
  .controller('CustomersCtrl', function ($rootScope, $scope, $http, $location, $routeParams, Customer, CustomerService) {

    $scope.customers = [];

    $scope.getCustomersByKey = function(key) {
      CustomerService.getCustomersByKey(key, function(customers) {
          $scope.customers = customers;
        });
    };

    if ($routeParams.startingWith !== undefined) {
      $scope.getCustomersByKey($routeParams.startingWith);
    }
    else {
      $scope.customers = Customer.query();
    }

    $scope.deleteCustomer = function(customer) {
      $scope.customers = _.without($scope.customers, customer);   
      customer = new Customer(customer);
      customer.$remove();      
    };

  });