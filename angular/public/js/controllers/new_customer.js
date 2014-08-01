'use strict';

angular.module('contactoApp')
  .controller('NewCustomerCtrl', function ($rootScope, $scope, $http, $location, $routeParams, Customer) {

    $scope.error = null;

    $scope.customer = {
      name: null,
      branch: null,
      website: null,
      tags: []
    };

    $scope.tags = null;

    $scope.setTags = function() {  

      if ($scope.tags != null) {
        var tags = [];

        angular.forEach($scope.tags.split(","), function(value) {
          
          if(value.trim() != "") {
            this.push(value.trim());
          }
          
        }, tags);

        $scope.customer.tags = tags;
      }
      else {
        $scope.customer.tags = null;
      }

    };

    $scope.saveCustomer = function() {
      
      $scope.setTags();
           
      var customer = new Customer($scope.customer);

      customer.$save(function(customer) {
        $location.path('/customer/' + customer.customerId);
       }, function(err) {
        $scope.error = "An error occurred while processing your request."
       });

    };

  });