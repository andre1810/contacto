'use strict';

angular.module('contactoApp')
  .controller('SearchCtrl', function ($rootScope, $scope, $http, $location, $routeParams, Customer, CustomerService) {

    $scope.keyword = "";
    $scope.customers = [];

    $scope.getCustomersByKeyword = function(keyword) {
      CustomerService.getCustomersByKeyword(keyword, function(customers) {
          $scope.customers = customers;
        });
    };

    if ($routeParams.keyword !== undefined) {
      $scope.keyword = $routeParams.keyword;
      $scope.getCustomersByKeyword($scope.keyword);
    }

  });