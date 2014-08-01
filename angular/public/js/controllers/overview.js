'use strict';

angular.module('contactoApp')
  .controller('OverviewCtrl', function ($rootScope, $scope, $http, $location, $routeParams, CustomerService) {

    CustomerService.getTotalCustomers(function(count) {
      $scope.totalCustomers = count;
    });

    CustomerService.getRecentlyAddedCustomers(function(newCustomers) {
      $scope.newCustomers = newCustomers;
    });

    CustomerService.getTags(function(tags) {
      $scope.tags = tags;
    });

  });